const { Router } = require('express');

const adminRouter = Router();

adminRouter.get('/', (_req, res) => {
  return res.status(200).json({
    module: 'admin',
    message: 'Admin module is ready',
  });
});

module.exports = { adminRouter };
