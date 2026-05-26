const { Router } = require('express');

const { visitorsRouter } = require('../../modules/visitors/http/visitors.routes');
const { tourGroupsRouter } = require('../../modules/tour-groups/http/tour-groups.routes');
const { tourGuidesRouter } = require('../../modules/tour-guides/http/tour-guides.routes');
const { adminRouter } = require('../../modules/admin/http/admin.routes');
const { rotationEngineRouter } = require('../../modules/rotation-engine/http/rotation-engine.routes');

const apiRouter = Router();

apiRouter.use('/visitors', visitorsRouter);
apiRouter.use('/tour-groups', tourGroupsRouter);
apiRouter.use('/tour-guides', tourGuidesRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/rotation-engine', rotationEngineRouter);

module.exports = { apiRouter };
