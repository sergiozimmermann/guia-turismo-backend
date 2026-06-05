const { Router } = require('express');

const { usersRouter } = require('../../modules/users/http/users.routes');
const { tourGroupsRouter } = require('../../modules/tour-groups/http/tour-groups.routes');
const { tourGuidesRouter } = require('../../modules/tour-guides/http/tour-guides.routes');
const { adminRouter } = require('../../modules/admin/http/admin.routes');
const { commissionsRouter } = require('../../modules/commissions/http/commissions.routes');
const { disciplineRouter } = require('../../modules/discipline/http/discipline.routes');
const { rotationEngineRouter } = require('../../modules/rotation-engine/http/rotation-engine.routes');

/**
 * @swagger
 * tags:
 *   - name: Users (Usuários)
 *     description: Endpoints para cadastro e autenticação de usuários
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

apiRouter.use('/users', usersRouter);
apiRouter.use('/tour-groups', tourGroupsRouter);
apiRouter.use('/tour-guides', tourGuidesRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/commissions', commissionsRouter);
apiRouter.use('/discipline', disciplineRouter);
apiRouter.use('/rotation-engine', rotationEngineRouter);

module.exports = { apiRouter };
