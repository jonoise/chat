import create from 'zustand'

export const useConnectionInfo = create<ConnectionInfo>((set) => ({
  username: '',
  room: '',
  setConnectionInfo: (name, value) => set((s) => ({ ...s, [name]: value })),
}))

interface ConnectionInfo {
  username: string
  room: string
  setConnectionInfo: (name: string, value: string) => void
}
