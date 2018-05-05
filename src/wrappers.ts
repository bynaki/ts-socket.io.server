import {
  Socket,
  On,
  Wrapper,
} from 'socket.io-decorator'
import {
  sendingErrorData,
} from './utils'

export const OnWrapped = On.next(async (socket, args, next) => {
  try {
    await next()
  } catch(err) {
    const ack = args[args.length -1]
    if(typeof ack === 'function') {
      ack(sendingErrorData(err))
    }
  }
}).next(async (socket, args, next) => {
  const res = await next()
  const ack = args[args.length - 1]
  if(typeof ack === 'function') {
    ack(null, res)
  }
}).on()