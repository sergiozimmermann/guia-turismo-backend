const bcrypt = require('bcryptjs');
const { execSync } = require('child_process');
const { prisma } = require('../config/prisma');
const env = require('../config/env');

async function applyMigrations() {
  try {
    execSync('npx prisma migrate deploy', {
      stdio: 'inherit',
      cwd: process.cwd(),
    });
  } catch (error) {
    console.error('[seed] Falha ao aplicar migrações:', error.message || error);
    throw error;
  }
}

async function ensureAdminUser() {
  const adminEmail = env.adminEmail.toLowerCase();
  const existingAdminByEmail = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdminByEmail) {
    if (existingAdminByEmail.role !== 'admin') {
      return prisma.user.update({
        where: { email: adminEmail },
        data: { role: 'admin' },
      });
    }

    return existingAdminByEmail;
  }

  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'admin' },
  });

  if (existingAdmin) {
    return existingAdmin;
  }

  const hashedPassword = await bcrypt.hash(env.adminPassword, 10);

  return prisma.user.create({
    data: {
      email: adminEmail,
      password: hashedPassword,
      name: env.adminName,
      role: 'admin',
    },
  });
}

async function seedDatabase() {
  await applyMigrations();

  const admin = await ensureAdminUser();
  console.log('[seed] Admin user is ready:', admin.email);
}

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('[seed] Erro ao executar seed:', error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}

module.exports = { seedDatabase };