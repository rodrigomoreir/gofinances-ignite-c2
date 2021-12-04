import React, { createContext, ReactNode, useContext, useState } from 'react'

import * as AuthSession from 'expo-auth-session'

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
  signInWithGoogle(): Promise<void>
}

interface AuthorizationResponse {
  params: {
    access_token: string
  }
  type: string
}

const AuthContext = createContext({} as IAuthContextData)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User)

  const signInWithGoogle = async () => {
    try {
      const CLIENT_ID = '468779211619-p6ns88of8flam04kc9uftd0hsdn3ph65.apps.googleusercontent.com'
      const REDIRECT_URI = 'https://auth.expo.io/@rodrigomoreir/gofinances'
      const RESPONSE_TYPE = 'token'
      const SCOPE = encodeURI('profile email')

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse
      // console.log(params)

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
        const userInfo = await response.json()

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture
        })
      }

    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    // Valor atual do contexto
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export { useAuth, AuthProvider }
