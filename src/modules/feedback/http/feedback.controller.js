const { FeedbackService } = require('../application/feedback.service');
const { AppError } = require('../../../shared/errors/app-error');

async function listFeedbackController(req, res, next) {
  try {
    const { targetType, targetId, type } = req.query;
    const feedbacks = await FeedbackService.list({ targetType, targetId, type });
    return res.status(200).json({ feedbacks });
  } catch (error) {
    next(error);
  }
}

async function createFeedbackController(req, res, next) {
  try {
    const { targetId, targetType, type, title, description } = req.body;
    if (!targetId || !targetType || !type || !title) {
      throw new AppError('targetId, targetType, type e title são obrigatórios', 400);
    }
    const feedback = await FeedbackService.create({
      targetId,
      targetType,
      type,
      title,
      description: description || '',
      status: 'new',
    });
    return res.status(201).json({ feedback });
  } catch (error) {
    next(error);
  }
}

async function updateFeedbackStatusController(req, res, next) {
  try {
    const { feedbackId } = req.params;
    const { status } = req.body;
    if (!status) throw new AppError('status é obrigatório', 400);
    const feedback = await FeedbackService.updateStatus(feedbackId, status);
    return res.status(200).json({ feedback });
  } catch (error) {
    next(error);
  }
}

async function deleteFeedbackController(req, res, next) {
  try {
    const { feedbackId } = req.params;
    await FeedbackService.delete(feedbackId);
    return res.status(200).json({ message: 'Feedback deleted', id: feedbackId });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listFeedbackController,
  createFeedbackController,
  updateFeedbackStatusController,
  deleteFeedbackController,
};
