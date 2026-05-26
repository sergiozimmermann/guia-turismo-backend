const { Router } = require('express');

const tourGroupsRouter = Router();

tourGroupsRouter.get('/', (_req, res) => {
  return res.status(200).json({
    module: 'tour-groups',
    message: 'Tour groups module is ready',
  });
});

module.exports = { tourGroupsRouter };
