import Logo from '../../images/logo_transparent.png'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../../components/Axios/Config'
import { useDispatch } from 'react-redux'
import EyeIcons from '../../components/UI/EyeIcons'
import { UserActions } from '../../stores/UserSlice'
import { UiActions } from '../../stores/UiSlice'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [hidden, setHidden] = useState(true)

  const [ui, setUi] = useState({
    text: 'login',
    color: '#689425',
    disable: false
  })

  const [errMsg, setErrMsg] = useState(null)

  const dataUpdate = (e) => {
    const { name, value } = e.target
    setErrMsg(null)
    setData(prev => ({...prev, [name]: value}))
  }

  const submitData = (e) => {
    setUi({text: 'Hold on...', color: 'var(--lightBlue)', disable: true})
    setErrMsg(null)
    e.preventDefault()

    instance({
        url: '/auth/login',
        method: 'post',
        data: data,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        dispatch(UserActions.getUser(res.data.user))
        dispatch(UiActions.getMessage())
        navigate('/cms')
        setData({
            email: '',
            password: ''
        })
        setUi({text: 'Login', color: '#689425', disable: false})
    })
    .catch(err => {
        setUi({text: 'Login', color: '#689425', disable: false})

        if(!err.response){
            return setErrMsg('Please check your connection and try again')
        }

        if(err.response.status === 404) {
            return setErrMsg('Incorrect email and password')
        }else if(err.response.status === 401) {
            return setErrMsg('Invalid login credentials')
        }else {
            return setErrMsg(err.response.data.msg)
        }
    })
  }

  useEffect(() => {
    instance({
      url: '/users/show-current-user',
      method: 'get'
    })
    .then(res => {
      dispatch(UserActions.getUser(res.data.user))
    })
    .then(() => navigate('/cms'))
    .catch(() => {
      console.log('not logged in')
    })

  }, [])

  return (
    <div className="login">
      <img src={Logo} alt='logo' />
      <form onSubmit={submitData}>
      <div>
        <label htmlFor="email">Email</label>
        <input onChange={dataUpdate} value={data.email} type="email" name="email" id="email" placeholder="Email Address" required />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input value={data.password} onChange={dataUpdate} type={hidden ? 'password' : 'text'} name="password" id='password' placeholder="Password" required />
        <EyeIcons hidden={hidden} setHidden={() => setHidden(prev => !prev)} />
      </div>

      <p className='error-message'>{errMsg}</p>

      <button disabled={ui.disable} style={{background: ui.color}} type="submit">{ui.text}</button>
      <p style={{textAlign: 'center'}}>Don't have an account? <Link to='/register'>Register</Link></p>
      <Link style={{textAlign: 'center', fontSize: '.9em', color: '#689425', fontWeight: '700', marginTop: '.5em'}} to='/forgotten'>Change password?</Link>
    </form>
    </div>
  )
}
