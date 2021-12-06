import { PORT } from './common'

export const swaggerConfig = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      version: 'v0',
      title: 'Shanti Memorial APIs',
      description: 'Skyome APIs documentation',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: `LOCAL ${PORT}`,
      },
    ],
  },
  apis: ['./src/routes/**/*.ts', './dist/routes/**/*.js'],
}
