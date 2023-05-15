import { User } from 'src/types/user.type'

export const localStorageEventTaget = new EventTarget()
export const setAccesstoken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const clearLs = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  // const clearLSEvent = new Event('clearLs')
  // localStorageEventTaget.dispatchEvent(clearLSEvent)
}
export const getAccesstokenFromLs = () => localStorage.getItem('access_token') || ''
export const getProfile = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfile = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
// export const setProfileToLS = (profile: User) => {
//   localStorage.setItem('profile', JSON.stringify(profile))
// }
