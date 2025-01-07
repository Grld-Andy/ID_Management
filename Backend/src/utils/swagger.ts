import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Name Here",
      version: "1.0.1",
      definition: "An express API",
    },
    components: {
        securitySchemes: {
            Authorization: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                value: 'Bearer <JWT token here>'
            },
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'refreshToken'
            }
        }
    }
  },
  apis: ["./src/docs/*"],
};

const specs = swaggerJsdoc(options);

export default {
  specs,
  swaggerUi,
};
