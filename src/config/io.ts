import { io } from 'socket.io-client'

const url = process.env.API_URL || 'http://localhost:4000'

export const socket = io('', { transports: ['websocket'] })
