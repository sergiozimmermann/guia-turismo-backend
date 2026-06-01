const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { prisma } = require('../../../config/prisma');
const { AppError } = require('../../../shared/errors/app-error');
const env = require('../../../config/env');

class VisitorsService {
  async register(email, password, name) {
    const existingVisitor = await prisma.visitor.findUnique({
      where: { email },
    });

    if (existingVisitor) {
      throw new AppError('Email já cadastrado', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const visitor = await prisma.visitor.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'visitor',
      },
    });

    const token = jwt.sign(
      { id: visitor.id, email: visitor.email, role: visitor.role },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn }
    );

    return {
      token,
      visitor: {
        id: visitor.id,
        email: visitor.email,
        name: visitor.name,
        role: visitor.role,
        createdAt: visitor.createdAt,
        updatedAt: visitor.updatedAt,
      },
    };
  }

  async login(email, password) {
    const visitor = await prisma.visitor.findUnique({
      where: { email },
    });

    if (!visitor) {
      throw new AppError('Email ou senha incorretos', 400);
    }

    const isPasswordValid = await bcrypt.compare(password, visitor.password);

    if (!isPasswordValid) {
      throw new AppError('Email ou senha incorretos', 400);
    }

    const token = jwt.sign(
      { id: visitor.id, email: visitor.email, role: visitor.role },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn }
    );

    return {
      token,
      visitor: {
        id: visitor.id,
        email: visitor.email,
        name: visitor.name,
        role: visitor.role,
        createdAt: visitor.createdAt,
        updatedAt: visitor.updatedAt,
      },
    };
  }
}

module.exports = { VisitorsService: new VisitorsService() };
