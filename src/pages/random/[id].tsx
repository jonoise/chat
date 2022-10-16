import React, { useEffect, useState } from 'react'
import { socket } from '@/config/io'
import toast, { Toaster } from 'react-hot-toast'
import { useConnectionInfo } from '@/stores'
import { nanoid } from 'nanoid'
import { TextInput } from '@/components/generics'
import Button from '@/components/generics/Button'
import { MessageI } from '@/types'
import { ChatBox } from '@/components/chat/ChatBox'
const RandomRoom = () => {
  const connectionInfo = useConnectionInfo((s) => s)
  const [messages, setMessages] = useState<MessageI[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.emit('join-room', {
      roomId: connectionInfo.room,
      user: { name: connectionInfo.username, id: nanoid() },
      date: new Date(),
    })

    return () => {
      socket.off('join-room')
    }
  }, [])

  useEffect(() => {
    socket.on('user-joined', (data: any) =>
      toast.success(`${data.user.name}, se acaba de unir a la sala`)
    )
    socket.on('incoming-message', (data: MessageI) =>
      setMessages((prev) => [...prev, data])
    )
    return () => {
      socket.off('user-joined')
    }
  }, [])

  const sendMessage = (e: any) => {
    e.preventDefault()
    if (message === '') toast('No puedes enviar un mensaje vacio')
    else {
      const newMessage = {
        id: nanoid(),
        roomId: connectionInfo.room,
        sender: connectionInfo.username,
        content: message,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, newMessage])
      socket.emit('send-message', newMessage)
      setMessage('')
    }
  }

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='relative w-full h-screen bg-gray-50 px-2'>
        <ChatBox messages={messages} />
        <form
          onSubmit={sendMessage}
          className='absolute flex bottom-0 w-full left-0 bg-gray-50'
        >
          <TextInput
            className='w-full shado rounded-r-none'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button className='rounded-l-none'>Enviar</Button>
        </form>
      </div>
    </>
  )
}

export default RandomRoom
