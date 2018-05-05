import * as IO from 'socket.io'
import {
  MockSpace,
} from './namespaces'


const port = process.env.PORT || 3000
const io = IO(port, {
  path: '/v1',
})
var mock = new MockSpace(io.of('mock'))

console.log(`Socket.IO Server is listening on ${port}`)
