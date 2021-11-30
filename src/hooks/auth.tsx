import React, { createContext, ReactNode, useContext } from 'react'

interface AuthProviderProps {
  // tipagem para um elemento filho
  children: ReactNode
}

interface User {
  id: string
  name: string
  email: string
  photo?: string
}

interface IAuthContextData {
  user: User
}

const AuthContext = createContext({} as IAuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = {
    id: '123',
    name: 'name',
    email: 'email',
    photo: 'photo'
  }

  return (
    // Valor atual do contexto
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export { useAuth, AuthProvider }
