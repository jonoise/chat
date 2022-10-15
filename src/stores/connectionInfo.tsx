import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useConnectionInfo = create(
  persist<ConnectionInfo>((set) => ({
    username: '',
    room: '',
    setConnectionInfo: (name, value) => set((s) => ({ ...s, [name]: value })),
  }))
)

interface ConnectionInfo {
  username: string
  room: string
  setConnectionInfo: (name: string, value: string) => void
}
