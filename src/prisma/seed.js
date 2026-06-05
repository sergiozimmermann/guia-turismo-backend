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
  const existingAdminByEmail = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (existingAdminByEmail) {
    if (existingAdminByEmail.role !== 'admin') {
      return prisma.user.update({ where: { email: adminEmail }, data: { role: 'admin' } });
    }
    return existingAdminByEmail;
  }

  const existingAdmin = await prisma.user.findFirst({ where: { role: 'admin' } });
  if (existingAdmin) return existingAdmin;

  const hashedPassword = await bcrypt.hash(env.adminPassword, 10);
  return prisma.user.create({
    data: { email: adminEmail, password: hashedPassword, name: env.adminName, role: 'admin' },
  });
}

async function ensureSampleGuides() {
  const sampleGuides = [
    { cnpj: '12.345.678/0001-90', legalRepresentativeCpf: '123.456.789-00', name: 'Turismo Horizonte Ltda', email: 'horizonte@guia.test', phone: '(47) 99901-0001', licenseNumber: 'TG-0001', languages: 'Português, Inglês', address: 'Rua das Flores, 100 - Balneário Camboriú' },
    { cnpj: '98.765.432/0001-10', legalRepresentativeCpf: '987.654.321-00', name: 'Guias Premium BC', email: 'premium@guia.test', phone: '(47) 99901-0002', licenseNumber: 'TG-0002', languages: 'Português, Espanhol', address: 'Av. Atlântica, 200 - Balneário Camboriú' },
  ];

  for (const guideData of sampleGuides) {
    const exists = await prisma.tourGuide.findFirst({ where: { cnpj: guideData.cnpj } });
    if (!exists) {
      await prisma.tourGuide.create({ data: guideData });
      console.log(`[seed] Tour guide created: ${guideData.name}`);
    }
  }
}

async function ensureSampleTourGroups() {
  const count = await prisma.tourGroup.count();
  if (count > 0) return;

  await prisma.tourGroup.create({
    data: {
      contractorName: 'MSC Cruzeiros',
      contractorDocument: '00.000.001/0001-00',
      passport: '',
      address: 'Porto de Itajaí - SC',
      nationality: 'Italiana',
      contactPerson: 'Carlos Mendes',
      transportType: 'Ônibus',
      transportModel: 'Mercedes-Benz',
      transportColor: 'Branco',
      licensePlate: 'ABC-1234',
      driverName: 'João Silva',
      driverContact: '(47) 98888-0001',
      language: 'Português',
      destination: 'Centro Histórico de BC',
      serviceDate: new Date('2026-06-10'),
      meetingPoint: 'Terminal Portuário',
      departureTime: '09:00',
      returnEstimate: '17:00',
      accommodation: 'Sem hospedagem',
      dayTrip: true,
      arrivalDate: new Date('2026-06-10'),
      returnDate: new Date('2026-06-10'),
      passengerCount: 25,
      profile: 'Família',
      status: 'pending',
    },
  });

  console.log('[seed] Sample tour group created');
}

async function seedDatabase() {
  await applyMigrations();

  const admin = await ensureAdminUser();
  console.log('[seed] Admin user is ready:', admin.email);
  console.log('[seed] Admin password from env (env.ADMIN_PASSWORD)');

  await ensureSampleGuides();
  await ensureSampleTourGroups();
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
