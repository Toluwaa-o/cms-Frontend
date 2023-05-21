import Logo from '../../images/logo_transparent.png'
import {Link} from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../../components/Axios/Config'
import { useDispatch } from 'react-redux'
import EyeIcons from '../../components/UI/EyeIcons'
import { UserActions } from '../../stores/UserSlice'
import { UiActions } from '../../stores/UiSlice'

export default function Forgotten() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    cnPassword: ''
  })

  const [hidden, setHidden] = useState({
    one: true,
    two: true,
    three: true
  })

  const [ui, setUi] = useState({
    text: 'Change Password',
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

    if(!data.email || !data.oldPassword || !data.newPassword || !data.cnPassword) {
        setUi({text: 'Update Password', color: '#689425', disable: false})
        return setErrMsg('Please provide all neccessary information')
    }

    if(data.newPassword !== data.cnPassword) {
        setUi({text: 'Update Password', color: '#689425', disable: false})
        return setErrMsg('Please confirm your new password')
    }

    instance({
        url: '/auth/forgotten-password',
        method: 'patch',
        data: { email: data.email, oldPassword: data.oldPassword, newPassword: data.newPassword },
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        dispatch(UserActions.getUser(res.data.user))
        dispatch(UiActions.getMessage())
        navigate('/login')
    })
    .catch(err => {
        setUi({text: 'Update Password', color: '#689425', disable: false})

        if(!err.response){
            return setErrMsg('Please check your connection and try again')
        }

        return setErrMsg(err.response.data.msg)
    })
  }

  return (
    <div className="forgotten">
      <img src={Logo} alt='logo' />
      <form onSubmit={submitData}>
      <div>
        <label htmlFor="email">Email</label>
        <input onChange={dataUpdate} value={data.email} type="email" name="email" id="email" placeholder="Email Address" required />
      </div>

      <div>
        <label htmlFor="oldPassword">Old Password</label>
        <input value={data.oldPassword} onChange={dataUpdate} type={hidden.one ? 'password' : 'text'} name="oldPassword" id='oldPassword' placeholder="Old Password" required />
        <EyeIcons hidden={hidden.one} setHidden={() => setHidden(prev => ({...prev, one: !prev.one}))} />
      </div>

      <div>
        <label htmlFor="newPassword">New Password</label>
        <input value={data.newPassword} onChange={dataUpdate} type={hidden.two ? 'password' : 'text'} name="newPassword" id='newPassword' placeholder="New Password" required />
        <EyeIcons hidden={hidden.two} setHidden={() => setHidden(prev => ({...prev, two: !prev.two}))} />
      </div>

      <div>
        <label htmlFor="cnPassword">Confirm New Password</label>
        <input value={data.cnPassword} onChange={dataUpdate} type={hidden.three ? 'password' : 'text'} name="cnPassword" id='cnPassword' placeholder="Confirm New Password" required />
        <EyeIcons hidden={hidden.three} setHidden={() => setHidden(prev => ({...prev, three: !prev.three}))} />
      </div>

      <p className='error-message'>{errMsg}</p>

      <button disabled={ui.disable} style={{background: ui.color}} type="submit">{ui.text}</button>
      <p>Don't have an account? <Link to='/register'>Register</Link></p>
    </form>
    </div>
  )
}
