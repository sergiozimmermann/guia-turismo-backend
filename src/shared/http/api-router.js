const { Router } = require('express');

const { usersRouter } = require('../../modules/users/http/users.routes');
const { tourGroupsRouter } = require('../../modules/tour-groups/http/tour-groups.routes');
const { tourGuidesRouter } = require('../../modules/tour-guides/http/tour-guides.routes');
const { adminRouter } = require('../../modules/admin/http/admin.routes');
const { commissionsRouter } = require('../../modules/commissions/http/commissions.routes');
const { disciplineRouter } = require('../../modules/discipline/http/discipline.routes');
const { rotationEngineRouter } = require('../../modules/rotation-engine/http/rotation-engine.routes');
const { contactsRouter } = require('../../modules/contacts/http/contacts.routes');
const { emergencyContactsRouter } = require('../../modules/emergency-contacts/http/emergency-contacts.routes');
const { feedbackRouter } = require('../../modules/feedback/http/feedback.routes');

const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/tour-groups', tourGroupsRouter);
apiRouter.use('/tour-guides', tourGuidesRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/commissions', commissionsRouter);
apiRouter.use('/discipline', disciplineRouter);
apiRouter.use('/rotation-engine', rotationEngineRouter);
apiRouter.use('/contacts', contactsRouter);
apiRouter.use('/emergency-contacts', emergencyContactsRouter);
apiRouter.use('/feedback', feedbackRouter);

module.exports = { apiRouter };
