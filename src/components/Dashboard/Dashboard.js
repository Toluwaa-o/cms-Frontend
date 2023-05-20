import {NavLink} from 'react-router-dom'
import Logo from '../../images/logo_transparent.png'
import { useState } from 'react'
import instance from '../Axios/Config'
import { UserActions } from '../../stores/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user.userType)
    const userId = useSelector(state => state.user.user)
    const myId = userId.userId ? userId.userId : userId._id

    const [showNav, setShowNav] = useState(false)

    const logout = () => {
        instance.delete('/auth/logout')
        .then(() => {
            setShowNav(false)
            dispatch(UserActions.clearUser())
            navigate('/login')
        })
        .catch(() => {
            setShowNav(false)
            navigate('/cms')
        })
    }

  return (
    <>
        <img src={Logo} alt='logo' />

        {!showNav ? <svg onClick={() => setShowNav(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path></svg>
        : <svg onClick={() => setShowNav(prev => !prev)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>}

        <nav className={showNav ? 'navIn' : 'navOut'}>
            <ul>
                <li>
                    <NavLink onClick={() => setShowNav(false)} to='/cms' end>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z"></path></svg>
                        Reports
                    </NavLink>
                </li>
                {user === 'admin' && <li>
                    <NavLink onClick={() => setShowNav(false)} to='officers'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
                        Officers
                    </NavLink>
                </li>}
                {user !== 'civilian' && <li>
                    <NavLink onClick={() => setShowNav(false)} to='stats'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 12a2 2 0 0 0-.703.133l-2.398-1.963c.059-.214.101-.436.101-.67C17 8.114 15.886 7 14.5 7S12 8.114 12 9.5c0 .396.1.765.262 1.097l-2.909 3.438A2.06 2.06 0 0 0 9 14c-.179 0-.348.03-.512.074l-2.563-2.563C5.97 11.348 6 11.179 6 11c0-1.108-.892-2-2-2s-2 .892-2 2 .892 2 2 2c.179 0 .348-.03.512-.074l2.563 2.563A1.906 1.906 0 0 0 7 16c0 1.108.892 2 2 2s2-.892 2-2c0-.237-.048-.46-.123-.671l2.913-3.442c.227.066.462.113.71.113a2.48 2.48 0 0 0 1.133-.281l2.399 1.963A2.077 2.077 0 0 0 18 14c0 1.108.892 2 2 2s2-.892 2-2-.892-2-2-2z"></path></svg>
                        Stats
                    </NavLink>
                </li>}
                <li>
                    <NavLink onClick={() => setShowNav(false)} to={'profile/'+ myId}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"></path></svg>
                        My Profile
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={logout} to='/login'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path><path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path></svg>
                        Logout
                    </NavLink>
                </li>
            </ul>
        </nav>
    </>
  )
}
