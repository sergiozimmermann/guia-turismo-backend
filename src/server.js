const env = require('./config/env');
const { createApp } = require('./app');
const { seedDatabase } = require('./prisma/seed');

const app = createApp();

seedDatabase()
  .then(() => {
    app.listen(env.port, () => {
      console.log(`[server] running on port ${env.port}`);
    });
  })
  .catch((error) => {
    console.error('[server] Falha ao inicializar o banco ou seed:', error);
    process.exit(1);
  });
