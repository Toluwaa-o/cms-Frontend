import { useSelector } from "react-redux/es/exports"
import { useNavigate } from "react-router"
import { useEffect } from 'react'

export default function UserRoutes(props) {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)

    useEffect(() => {
      if(!user) navigate('/login')
    }, [])
    
  return (
    <>
    {user && props.children}
    </>
  )
}
