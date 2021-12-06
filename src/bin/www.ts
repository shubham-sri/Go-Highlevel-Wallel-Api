#!/usr/bin/env node

/**
 * Env config
 */
import dotenv from 'dotenv'
dotenv.config()

/**
 * Module dependencies.
 */

import Debug from 'debug'
import http from 'http'

import { App } from '../app'
import { Logger } from '../config'
import { PORT } from '../config/common'

const debug = Debug('skyome-hardware:server')

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(PORT)
App.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(App)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  Logger.info(`onError: ${bind}`)

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      return process.exit(1)
    case 'EADDRINUSE':
      return process.exit(1)
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port
  debug('Listening on ' + bind)
  Logger.info('Listening on ' + bind)
}

// In development, kills process on Ctrl+C
if (process.env.NODE_ENV !== 'production') {
  const killSignals = ['SIGINT', 'SIGTERM']
  killSignals.forEach((signal) => process.on(signal, () => process.exit(0)))
}
