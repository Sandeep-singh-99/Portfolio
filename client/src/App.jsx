import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import NavBar from './components/NavBar'

export default function App() {
  return (
    <>
    <NavBar/>
    <Outlet/>

    <Toaster/>
    </>
  )
}
