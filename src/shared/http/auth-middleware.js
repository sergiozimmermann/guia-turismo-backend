const jwt = require('jsonwebtoken');
const { AppError } = require('../errors/app-error');
const env = require('../../config/env');

function authenticateToken(req, _res, next) {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;

  if (!token) {
    throw new AppError('Token de autenticação ausente.', 401);
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    throw new AppError('Token inválido ou expirado.', 401);
  }
}

function authorizeRoles(roles = []) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError('Acesso negado.', 403);
    }

    next();
  };
}

module.exports = {
  authenticateToken,
  authorizeRoles,
};
