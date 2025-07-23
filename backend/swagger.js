const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto Masivos API Docs",
      version: "1.0.0",
      description: "Crypto Masivos API Docs",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [
      { bearerAuth: [] }
    ],
    servers: [
      {
        url: "/",
      },
    ],
  },
  apis: ['./src/docs/*.swagger.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;