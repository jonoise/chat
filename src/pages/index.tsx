import type { NextPage } from 'next'
import { useEffect } from 'react'
import { socket } from '../config/io'

const Home: NextPage = () => {
  useEffect(() => {
    socket.on('r', (data) => console.log(data))
  }, [])

  const onClick = () => {
    socket.emit('s', 'Hello from client')
  }

  return (
    <div>
      <button onClick={onClick}>talk to my api</button>
    </div>
  )
}

export default Home
