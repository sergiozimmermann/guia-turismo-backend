const dotenv = require('dotenv');

dotenv.config();

function getEnv(name, fallback) {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const env = {
  nodeEnv: getEnv('NODE_ENV', 'development'),
  port: Number(getEnv('PORT', '3333')),
  apiPrefix: getEnv('API_PREFIX', '/api/v1'),
  databaseUrl: getEnv('DATABASE_URL'),
  jwtSecret: getEnv('JWT_SECRET', 'please-change-this'),
  jwtExpiresIn: getEnv('JWT_EXPIRES_IN', '7d'),
  tourGuideTokenExpiresInHours: Number(getEnv('TOUR_GUIDE_TOKEN_EXPIRES_IN_HOURS', '24')),
  adminEmail: getEnv('ADMIN_EMAIL', 'admin@guia-turismo.com'),
  adminPassword: getEnv('ADMIN_PASSWORD', 'Admin1234!'),
  adminName: getEnv('ADMIN_NAME', 'Administrador'),
};

module.exports = env;
