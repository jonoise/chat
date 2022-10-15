import { io } from 'socket.io-client'

const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export const socket = io(url, { transports: ['websocket'] })
