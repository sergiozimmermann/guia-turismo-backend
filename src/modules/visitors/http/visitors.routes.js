const { Router } = require('express');

const visitorsRouter = Router();

visitorsRouter.get('/', (_req, res) => {
  return res.status(200).json({
    module: 'visitors',
    message: 'Visitors module is ready',
  });
});

module.exports = { visitorsRouter };
