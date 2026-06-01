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
        url: process.env.API_URL || 'http://localhost:3333/api/v1',
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
        Visitor: {
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
              enum: ['visitor'],
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
        VisitorRegister: {
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
        VisitorLogin: {
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
            visitor: {
              $ref: '#/components/schemas/Visitor',
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
      },
    },
  },
  apis: [
    './src/shared/http/api-router.js',
    './src/modules/visitors/http/visitors.routes.js',
    './src/modules/tour-groups/http/tour-groups.routes.js',
  ],
};

const specs = swaggerJsdoc(options);

module.exports = { specs };
