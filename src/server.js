const env = require('./config/env');
const { createApp } = require('./app');

const app = createApp();

app.listen(env.port, () => {
  console.log(`[server] running on port ${env.port}`);
});
