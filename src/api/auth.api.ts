import { AuthReponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const registerAcount = (body: { email: string; password: string }) => http.post<AuthReponse>('/register', body)
export const loginAcount = (body: { email: string; password: string }) => http.post<AuthReponse>('/login', body)
export const logoutAcount = () => http.post('/logout')
