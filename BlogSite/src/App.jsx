import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login,logout } from './store/authSlice'
import {Header,Footer} from './components'
import { Outlet } from 'react-router-dom'
function App() {
  //If we created in core react we need this import s tatement 
  //console.log(process.env.REACT_APP_APPWRITE_URL)
  //but in the vite we will use the 
  //console.log(import.meta.env.VITE_APPWRITE_URL)

  //here we are creating this loading variable because whenever we are fetching the data from the database it takes time to load so we make this loading service so that we can show there by the help of the loading icon that data is loading now 
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    //finally is the keyword which will run definately so we set the loading state false because all the data has been loaded 
    .finally(() => setLoading(false))
  },[])

  return !loading ?  (
    <div className='min-h-screen flex flex-wrap bg-grey-400 content-between'>
      <div className='w-full block '>
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ):null}
export default App
