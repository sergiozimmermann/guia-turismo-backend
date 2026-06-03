const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Guia Turismo API',
      version: '0.1.0',
      description: 'API para gerenciamento de guias de turismo e grupos de turistas',
      contact: {
        name: 'Support',
        email: 'support@guiaturismo.com',
      },
    },
    servers: [
      {
        url: process.env.API_URL || `http://localhost:${process.env.PORT || 3333}/api/v1`,
        description: 'API Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            details: {
              type: 'object',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            name: {
              type: 'string',
            },
            role: {
              type: 'string',
              enum: ['visitor', 'guide', 'admin'],
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        UserRegister: {
          type: 'object',
          required: ['email', 'password', 'name'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
              minLength: 6,
            },
            name: {
              type: 'string',
            },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
            },
          },
        },
        AuthToken: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        TourGroup: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            contractorName: {
              type: 'string',
            },
            contractorDocument: {
              type: 'string',
            },
            passport: {
              type: 'string',
              nullable: true,
            },
            address: {
              type: 'string',
            },
            nationality: {
              type: 'string',
              nullable: true,
            },
            contactPerson: {
              type: 'string',
            },
            transportType: {
              type: 'string',
            },
            transportModel: {
              type: 'string',
            },
            transportColor: {
              type: 'string',
            },
            licensePlate: {
              type: 'string',
            },
            driverName: {
              type: 'string',
            },
            driverContact: {
              type: 'string',
            },
            language: {
              type: 'string',
            },
            destination: {
              type: 'string',
            },
            serviceDate: {
              type: 'string',
              format: 'date-time',
            },
            meetingPoint: {
              type: 'string',
            },
            departureTime: {
              type: 'string',
            },
            returnEstimate: {
              type: 'string',
            },
            accommodation: {
              type: 'string',
            },
            dayTrip: {
              type: 'boolean',
            },
            arrivalDate: {
              type: 'string',
              format: 'date-time',
            },
            returnDate: {
              type: 'string',
              format: 'date-time',
            },
            passengerCount: {
              type: 'integer',
            },
            profile: {
              type: 'string',
            },
            status: {
              type: 'string',
              enum: ['pending', 'guide_linked'],
            },
            guideId: {
              type: 'string',
              nullable: true,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        TourGroupRegister: {
          type: 'object',
          required: [
            'contractorName',
            'contractorDocument',
            'address',
            'contactPerson',
            'transportType',
            'transportModel',
            'transportColor',
            'licensePlate',
            'driverName',
            'driverContact',
            'language',
            'destination',
            'serviceDate',
            'meetingPoint',
            'departureTime',
            'returnEstimate',
            'accommodation',
            'dayTrip',
            'arrivalDate',
            'returnDate',
            'passengerCount',
            'profile',
          ],
          properties: {
            contractorName: {
              type: 'string',
            },
            contractorDocument: {
              type: 'string',
            },
            passport: {
              type: 'string',
            },
            address: {
              type: 'string',
            },
            nationality: {
              type: 'string',
            },
            contactPerson: {
              type: 'string',
            },
            transportType: {
              type: 'string',
            },
            transportModel: {
              type: 'string',
            },
            transportColor: {
              type: 'string',
            },
            licensePlate: {
              type: 'string',
            },
            driverName: {
              type: 'string',
            },
            driverContact: {
              type: 'string',
            },
            language: {
              type: 'string',
            },
            destination: {
              type: 'string',
            },
            serviceDate: {
              type: 'string',
              format: 'date-time',
            },
            meetingPoint: {
              type: 'string',
            },
            departureTime: {
              type: 'string',
            },
            returnEstimate: {
              type: 'string',
            },
            accommodation: {
              type: 'string',
            },
            dayTrip: {
              type: 'boolean',
            },
            arrivalDate: {
              type: 'string',
              format: 'date-time',
            },
            returnDate: {
              type: 'string',
              format: 'date-time',
            },
            passengerCount: {
              type: 'integer',
            },
            profile: {
              type: 'string',
            },
          },
        },
        TourGuide: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            cnpj: {
              type: 'string',
            },
            legalRepresentativeCpf: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
              nullable: true,
            },
            phone: {
              type: 'string',
              nullable: true,
            },
            licenseNumber: {
              type: 'string',
              nullable: true,
            },
            languages: {
              type: 'string',
              nullable: true,
            },
            address: {
              type: 'string',
              nullable: true,
            },
            active: {
              type: 'boolean',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        TourGuideRegister: {
          type: 'object',
          required: ['cnpj', 'legalRepresentativeCpf', 'name'],
          properties: {
            cnpj: {
              type: 'string',
            },
            legalRepresentativeCpf: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
              format: 'email',
            },
            phone: {
              type: 'string',
            },
            licenseNumber: {
              type: 'string',
            },
            languages: {
              type: 'string',
            },
            address: {
              type: 'string',
            },
            active: {
              type: 'boolean',
            },
          },
        },
        TourGuideClaimAccess: {
          type: 'object',
          required: ['token', 'password'],
          properties: {
            token: {
              type: 'string',
              description: 'Token gerado pelo administrador para ativação do acesso do guia',
            },
            password: {
              type: 'string',
              minLength: 6,
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do guia, requerido se não estiver cadastrado no registro do guia',
            },
          },
        },
        TourGuideScheduleItem: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            dayOfWeek: {
              type: 'string',
              enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            },
            startTime: {
              type: 'string',
              description: 'Horário de início no formato HH:mm',
            },
            endTime: {
              type: 'string',
              description: 'Horário de término no formato HH:mm',
            },
            active: {
              type: 'boolean',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        TourGuideScheduleUpdate: {
          type: 'object',
          required: ['schedule'],
          properties: {
            schedule: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/TourGuideScheduleItem',
              },
            },
          },
        },
        TourGroupAssignGuide: {
          type: 'object',
          required: ['guideId'],
          properties: {
            guideId: {
              type: 'string',
            },
          },
        },
      },
    },
  },
  apis: [
    './src/shared/http/api-router.js',
    './src/modules/users/http/users.routes.js',
    './src/modules/tour-groups/http/tour-groups.routes.js',
    './src/modules/tour-guides/http/tour-guides.routes.js',
    './src/modules/admin/http/admin.routes.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
