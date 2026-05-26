const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const env = require('./config/env');
const { apiRouter } = require('./shared/http/api-router');
const { notFoundHandler } = require('./shared/http/not-found-handler');
const { errorHandler } = require('./shared/http/error-handler');

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

  app.get('/health', (_req, res) => {
    return res.status(200).json({
      status: 'ok',
      service: 'guia-turismo-backend',
      timestamp: new Date().toISOString(),
    });
  });

  app.use(env.apiPrefix, apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
