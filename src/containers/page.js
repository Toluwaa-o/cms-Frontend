import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import instance from '../components/Axios/Config'
import { UserActions } from '../stores/UserSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Popup from '../components/UI/PopUpMessage'
import { UiActions } from '../stores/UiSlice'
import { useLocation } from 'react-router'

export default function Page() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const message = useSelector(state => state.ui.message)
  // const user = useSelector(state => state.user.user)

  // useEffect(() => {
  //   instance({
  //     url: '/users/show-current-user',
  //     method: 'get'
  //   })
  //   .then(res => {
  //     dispatch(UserActions.getUser(res.data.user))
  //   })
  //   .catch(() => {
  //       console.log('not logged in')
  //       return navigate('/login')
  //   })

  // }, [])

  useEffect(() => {
    if(location.pathname === '/'){
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
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      dispatch(UiActions.clearMessage())
    }, 1500);
  }, [message])

  return (
    <>
    <Outlet />
    {message && <Popup />}
    </>
  )
}
