import { useSelector } from "react-redux/es/exports"
import { useNavigate } from "react-router"
import { useEffect } from 'react'

export default function AdminRoutes(props) {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user.userType)

    useEffect(() => {
      if(user !== 'admin') navigate('/cms')
    }, [])

  return (
    <>
    {user === 'admin' && props.children}
    </>
  )
}
