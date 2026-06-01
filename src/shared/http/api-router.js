const { Router } = require('express');

const { visitorsRouter } = require('../../modules/visitors/http/visitors.routes');
const { tourGroupsRouter } = require('../../modules/tour-groups/http/tour-groups.routes');
const { tourGuidesRouter } = require('../../modules/tour-guides/http/tour-guides.routes');
const { adminRouter } = require('../../modules/admin/http/admin.routes');
const { rotationEngineRouter } = require('../../modules/rotation-engine/http/rotation-engine.routes');

/**
 * @swagger
 * tags:
 *   - name: Visitors (Turistas)
 *     description: Endpoints para cadastro e autenticação de turistas
 *   - name: Tour Groups (Grupos de Turistas)
 *     description: Endpoints para gerenciamento de grupos de turistas
 *   - name: Tour Guides (Guias de Turismo)
 *     description: Endpoints para guias de turismo
 *   - name: Admin (Administrador)
 *     description: Endpoints para administradores
 *   - name: Rotation Engine
 *     description: Endpoints para o motor de alocação de guias
 */
const apiRouter = Router();

apiRouter.use('/visitors', visitorsRouter);
apiRouter.use('/tour-groups', tourGroupsRouter);
apiRouter.use('/tour-guides', tourGuidesRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/rotation-engine', rotationEngineRouter);

module.exports = { apiRouter };
