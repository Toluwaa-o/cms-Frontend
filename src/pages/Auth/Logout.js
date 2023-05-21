import instance from "../../components/Axios/Config"
import { useEffect } from "react"
import { UserActions } from "../../stores/UserSlice"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import Loader from "../../components/UI/Loader"


export default function Logout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        instance.delete('/auth/logout')
        .then(() => {
            dispatch(UserActions.clearUser())
            navigate('/login')
        })
        .catch(() => {
            navigate('/cms')
        })
    }, [])

  return (
    <Loader />
  )
}
