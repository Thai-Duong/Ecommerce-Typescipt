import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccesstokenFromLs, getProfile } from 'src/utils/auth'

interface AppContextInterface {
  isAuthentication: boolean
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}
const initialAppContext: AppContextInterface = {
  isAuthentication: Boolean(getAccesstokenFromLs()),
  setIsAuthentication: () => null,
  profile: getProfile(),
  setProfile: () => null
}
export const AppContext = createContext<AppContextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthentication, setIsAuthentication] = useState<boolean>(initialAppContext.isAuthentication)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  const reset = () => {
    setIsAuthentication(false)
  }
  return (
    <AppContext.Provider
      value={{
        isAuthentication,
        setIsAuthentication,
        profile,
        setProfile
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
