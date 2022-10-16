import { useConnectionInfo } from '@/stores'
import { MessageI } from '@/types'
import React, { FC } from 'react'

interface ChatBoxI {
  messages: MessageI[]
}

export const ChatBox: FC<ChatBoxI> = (props) => {
  const { messages } = props
  const username = useConnectionInfo((s) => s.username)
  return (
    <div className='h-full flex flex-col justify-end pb-12'>
      {messages.map((m) => {
        if (m.sender === username) {
          return (
            <div key={m.id} className='flex flex-row-reverse mb-2'>
              <div className='flex flex-col'>
                <div className='text-sm text-gray-400'>{m.sender} dice:</div>
                <div className='bg-blue-500 text-white p-2 rounded-lg'>
                  {m.content}
                </div>
                <div className='text-xs text-gray-400'>
                  {m.timestamp.toLocaleString()}
                </div>
              </div>
            </div>
          )
        }
        return (
          <div key={m.id} className='flex mb-2'>
            <div className='flex flex-col'>
              <div className='text-sm text-gray-400'>{m.sender} dice:</div>
              <div className='bg-green-500 text-white p-2 rounded-lg'>
                {m.content}
              </div>
              <div className='text-xs text-gray-400'>
                {m.timestamp.toLocaleString()}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
