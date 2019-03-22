import * as jwt from 'jsonwebtoken'
import {
  Authorizer,
  Payload,
} from 'bynaki.auth'
import {
  ErrorUnauthorized,
} from '../errors'
import {
  Socket,
  Middleware,
} from 'socket.io-decorator'


const auth = new Authorizer('./jwtconfig.json')


function _decodeToken(token: string): Payload {
  try {
    return auth.verify(token)
  } catch(err) {
    // if it has failed to verify, it will return an error message
    throw new ErrorUnauthorized(err.message)
  } 
}

export const decodeToken: Middleware = (socket, next, ctx) => {
  try {
    const token = socket.handshake.headers['x-access-token'] || socket.handshake.query.token
    if(token) {
      socket['_decoded'] = auth.verify(token)
    }
    next()
  } catch(err) {
    next(new ErrorUnauthorized(err.message))
  }
}

export function getDecodedToken(socket: Socket): Payload {
  return socket['_decoded']
}