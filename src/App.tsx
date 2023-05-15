import useRouter from './useRouter'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const routerElement = useRouter()
  return (
    <div>
      {routerElement}
      <ToastContainer />
    </div>
  )
}

export default App
