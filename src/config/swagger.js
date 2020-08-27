const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Validator = require('swagger-model-validator');

import { APP_PORT, URL } from './env';

const options = {
  swaggerDefinition: {
    info: {
      title: 'REST - DEVs API',
      version: '1.0.0',
      description: 'REST API with Swagger doc',
      contact: {
        email: 'atendimento@accellog.com'
      }
    },
    schemes: ['http', 'https'],
    host: `${URL}:${APP_PORT}`,
    basePath: '/api',
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        description: 'JWT authorization of the API',
        name: 'token',
        in: 'header'
      }
    },
    security: [
      {
        JWT: []
      }
    ]
  },
  apis: ['./src/**/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
const validator = new Validator(swaggerSpec);
const router = express.Router();

router.get('/json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

function validateModel(name, model) {
  const responseValidation = swaggerSpec.validateModel(
    name,
    model,
    false,
    true
  );
  if (!responseValidation.valid) {
    return false;
  }
  return true;
}

module.exports = {
  router,
  validateModel
};
