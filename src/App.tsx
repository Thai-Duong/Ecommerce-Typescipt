import { useContext, useEffect } from 'react'
import useRouter from './useRouter'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { localStorageEventTaget } from './utils/auth'
import { AppContext } from './context/app.context'
function App() {
  const routerElement = useRouter()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTaget.addEventListener('clearLS', () => reset())
  }, [reset])
  return (
    <div>
      {routerElement}
      <ToastContainer />
    </div>
  )
}

export default App
