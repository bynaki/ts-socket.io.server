import * as jwt from 'jsonwebtoken'
import {
  JwtConfig,
  DecodedToken,
} from '../interface'
import {
  ErrorUnauthorized,
} from '../errors'
import {
  Socket,
  Middleware,
} from 'socket.io-decorator'
import {
  BaseNamespace,
} from 'socket.io-decorator'


function _decodeToken(token: string, config: JwtConfig): DecodedToken {
  try {
    // create a promise that decodes the token
    const decoded: DecodedToken = jwt.verify(token, config.secret) as DecodedToken
    if(decoded.iss !== config.options.issuer 
      || decoded.sub !== config.options.subject) {
        throw new Error('The wrong token.')
    }
    let now = Date.now()
    now = (now - now % 1000) / 1000
    if(!(now >= decoded.iat && now <= decoded.exp)) {
      throw new Error('The authentication has expired.')
    }
    decoded.permissions || (decoded.permissions = [])
    decoded.permissions.map(p => p.toLowerCase())
    return decoded
  } catch(err) {
    // if it has failed to verify, it will return an error message
    throw new ErrorUnauthorized(err.message)
  } 
}

export function decodeToken(config: JwtConfig): Middleware {
  return (socket, next, ctx) => {
    try {
      const token = socket.handshake.headers['x-access-token'] || socket.handshake.query.token
      if(token) {
        socket['_decoded'] = _decodeToken(token, config)
      }
      next()
    } catch(err) {
      next(err)
    }
  }
}

export function getDecodedToken(socket: Socket): DecodedToken {
  return socket['_decoded']
}