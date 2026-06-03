const { UsersService } = require('../application/users.service');
const { AppError } = require('../../../shared/errors/app-error');

function validateRegisterPayload(payload) {
  const { email, password, name } = payload;

  if (!email || !password || !name) {
    throw new AppError(
      'email, password e name são obrigatórios',
      400,
      { requiredFields: ['email', 'password', 'name'] }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('Email inválido', 400);
  }

  if (password.length < 6) {
    throw new AppError('Senha deve ter no mínimo 6 caracteres', 400);
  }

  if (name.trim().length < 3) {
    throw new AppError('Nome deve ter no mínimo 3 caracteres', 400);
  }

  return { email: email.toLowerCase(), password, name: name.trim() };
}

function validateLoginPayload(payload) {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(
      'email e password são obrigatórios',
      400,
      { requiredFields: ['email', 'password'] }
    );
  }

  return { email: email.toLowerCase(), password };
}

async function getCurrentUserController(req, res, next) {
  try {
    const user = await UsersService.getUserById(req.user.id);

    if (!user) {
      throw new AppError('Usuário não encontrado.', 404);
    }

    return res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    next(error);
  }
}

async function registerUserController(req, res, next) {
  try {
    const { email, password, name } = validateRegisterPayload(req.body);
    const result = await UsersService.register(email, password, name);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function loginUserController(req, res, next) {
  try {
    const { email, password } = validateLoginPayload(req.body);
    const result = await UsersService.login(email, password);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { registerUserController, loginUserController, getCurrentUserController };
