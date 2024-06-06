import path from "path";

const environments = {
  APP_ENVIRONMENT:"DEV",
  APP_VERSION: "v1",
  APP_PORT: Number(process.env.APP_PORT),
  SWAGGER_SPEC: {
    swaggerDefinition: {
      openapi: '3.0.1',
      info: {
        title: "ONESTA API",
        version: "1.0.0",
        description: "metodos disponibles para el manejo de las operaciones del negocio"
      },
      servers: [
        {
          url: process.env.APP_URL,
          description: `Server located in ${process.env.APP_ENVIRONMENT}`,
        },
      ],
    },
    apis: [
      path.join(__dirname, '../../src/modules/**/infrastructure/api/**/**.yml'),
    ],
  },
}
export default environments;

