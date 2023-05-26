import { useEffect } from "react"
import Dashboard from "../components/Dashboard/Dashboard"
import {Outlet, useNavigate} from 'react-router-dom'
import instance from "../components/Axios/Config"
import { useDispatch } from "react-redux"
import { UserActions } from "../stores/UserSlice"

export default function Main() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    instance({
      url: '/users/show-current-user',
      method: 'get'
    })
    .then(res => {
      dispatch(UserActions.getUser(res.data.user))
    })
    .catch(() => {
        console.log('not logged in')
        return navigate('/login')
    })
  }, [])
  
  return (
    <div className="main">
    <header>
      <Dashboard />
    </header>

    <main>
      <Outlet />
    </main>
    </div>
  )
}
