import { PORT } from './common'

export const swaggerConfig = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      version: 'v0',
      title: 'Wallet APIs',
      description: 'Wallet APIs documentation',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: `LOCAL ${PORT}`,
      },
      {
        url: `https://go-high-level-wallet-api.azurewebsites.net/`,
        description: `Go High Level Wallet Api - Qa`,
      },
    ],
  },
  apis: ['./src/routes/**/*.ts', './dist/routes/**/*.js'],
}
