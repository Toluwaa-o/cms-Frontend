import { useSelector } from "react-redux/es/exports"
import { useNavigate } from "react-router"
import { useEffect } from 'react'

export default function OfficerRoutes(props) {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user.userType)

    useEffect(() => {
      if(user === 'user') navigate('/cms')
    }, [])

  return (
    <>
    {user !== 'user' && props.children}
    </>
  )
}
