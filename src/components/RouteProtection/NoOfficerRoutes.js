import { useSelector } from "react-redux/es/exports"
import { useNavigate } from "react-router"
import { useEffect } from 'react'

export default function NoOfficerRoutes(props) {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user.userType)

    useEffect(() => {
      if(user === 'officer') navigate('/cms')
    }, [])
    
  return (
    <>
    {user !== 'officer' && props.children}
    </>
  )
}
