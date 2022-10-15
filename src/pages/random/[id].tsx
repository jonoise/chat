import React, { useEffect } from 'react'
import { socket } from '@/config/io'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useConnectionInfo } from '@/stores'
const RandomRoom = () => {
  const router = useRouter()
  const connectionInfo = useConnectionInfo((s) => s)
  useEffect(() => {
    router.isReady &&
      socket.emit('join-room', {
        roomId: 'random',
        user: { name: connectionInfo.username, id: 1 },
        date: new Date(),
      })

    return () => {
      socket.off('join-room')
    }
  }, [router])

  useEffect(() => {
    socket.on('user-joined', (data: any) =>
      toast.success(`${data.user.name}, se acaba de unir a la sala`)
    )
    return () => {
      socket.off('user-joined')
    }
  }, [])

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false} />
    </div>
  )
}

export default RandomRoom