const { Router } = require('express');

const tourGuidesRouter = Router();

tourGuidesRouter.get('/', (_req, res) => {
  return res.status(200).json({
    module: 'tour-guides',
    message: 'Tour guides module is ready',
  });
});

module.exports = { tourGuidesRouter };
