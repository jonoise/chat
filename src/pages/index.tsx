import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { socket } from '../config/io'
import { nanoid } from 'nanoid'
import { TextInput } from '@/components/generics'
import { useConnectionInfo } from '@/stores'
import Button from '@/components/generics/Button'

const Home: NextPage = () => {
  const connectionInfo = useConnectionInfo((s) => s)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    connectionInfo.setConnectionInfo(e.target.name, e.target.value)
  }

  const router = useRouter()

  const joinRoom = () => {
    router.push(`/random/${connectionInfo.room}`)
  }

  return (
    <div className='flex flex-col px-10'>
      <TextInput
        onChange={onChange}
        name='username'
        placeholder='Ingresa tu username'
      />
      <TextInput
        onChange={onChange}
        name='room'
        placeholder='Ingresa el ID del room'
      />
      <Button onClick={() => joinRoom()}>join random chat</Button>
    </div>
  )
}

export default Home
