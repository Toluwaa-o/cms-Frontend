import {Link} from 'react-router-dom'
import EyeIcons from '../../components/UI/EyeIcons'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import instance from '../../components/Axios/Config'
import { UserActions } from '../../stores/UserSlice'
import { UiActions } from '../../stores/UiSlice'

export default function Registration() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        number: '',
        address: '',
        password: '',
        cpassword: '',
        officer: false
    })
  
  const dataUpdater = (e) => {
      const { name, value } = e.target
      setErrMsg(null)

      if(name === 'officer') return setData(prev => ({...prev, officer: !prev.officer}))
      setData(prev => ({...prev, [name]: value}))
  }

  const [ui, setUi] = useState({
      text: 'sign up',
      color: '#689425',
      disable: false
  })

  const [errMsg, setErrMsg] = useState(null)
  const [hidden, setHidden] = useState({
      one: true,
      two: true
  })

  const submitData = (e) => {
    e.preventDefault()

    setUi({text: 'Hold on...', color: 'var(--lightBlue)', disable: true})
    setErrMsg(null)

    let mailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if(data.firstName === '' || data.lastName === '' || data.email === '' || data.password === '' || data.cpassword === '') {
      setUi({ text: 'sign up', color: '#689425', disable: false })
        return setErrMsg('Please provide all the required information')
    }

    if(!data.email.match(mailRegEx)) {
        setUi({ text: 'sign up', color: '#689425', disable: false })
        return setErrMsg('Please provide a valid email')
    }

    if(data.password.length < 8) {
        setUi({ text: 'sign up', color: '#689425', disable: false })
        return setErrMsg('Please provide a stronger password')
    }

    if(data.officer && !data.address && !data.number) {
        setUi({ text: 'sign up', color: '#689425', disable: false })
        return setErrMsg('Please provide all the required information')
    }

    if(data.password === data.cpassword){
      const { firstName, lastName, email, password } = data

        const formData = { firstName, lastName, email, password }

        if(data.number !== '') formData.contact = data.number
        if(data.address !== '') formData.address = data.address
        
        formData.userType = data.officer ? 'officer' : 'civilian'

        instance({
            url: '/auth/signup',
            method: 'post',
            data: formData,
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(res => {
            setUi({ text: 'sign up', color: '#689425', disable: false })
            dispatch(UserActions.getUser(res.data.user))
            dispatch(UiActions.getMessage())
            navigate('/cms')
        })
        .catch(err => {
            setUi({ text: 'sign up', color: '#689425', disable: false })
            if(!err.response){
                return setErrMsg('Please check your connection and try again')
            }

            if(err.response.status === 404) {
                setErrMsg('Please provide all necessary values')
            }else {
                setErrMsg(err.response.data.msg)
            }
        })
    }else {
        setErrMsg('Please confirm your password')
        setUi({ text: 'sign up', color: '#689425', disable: false })
    }
}

    return (
    <div className='register'>
      <form onSubmit={submitData}>
        <h2>Register</h2>
        <p className='register-instructions'>Please fill this form in order to submit a report</p>
        <div>
          <label htmlFor='firstName'>First Name*</label>
          <input value={data.firstName} onChange={dataUpdater} required type='text' name='firstName' id='firstName' placeholder='First Name' />
        </div>

        <div>
          <label htmlFor='lastName'>Last Name*</label>
          <input value={data.lastName} onChange={dataUpdater} required type='text' name='lastName' id='lastName' placeholder='Last Name' />
        </div>

        <div>
          <label htmlFor='email'>Email*</label>
          <input value={data.email} onChange={dataUpdater} required type='email' name='email' id='email' placeholder='Email Address' />
        </div>

        <div>
          <label htmlFor='number'>Phone Number{data.officer && '*'}</label>
          <input value={data.number} onChange={dataUpdater} type='tel' name='number' id='number' placeholder='Phone Number' required={data.officer} />
        </div>

        <div className='addr'>
          <label htmlFor='address'>Address{data.officer && '*'}</label>
          <input value={data.address} onChange={dataUpdater} type='text' name='address' id='address' placeholder='Address' required={data.officer} />
        </div>

        <div>
          <label htmlFor='password'>Password*</label>
          <input value={data.password} onChange={dataUpdater} required type={hidden.one ? 'password' : 'text'} name='password' id='password' placeholder='Password' />
          <EyeIcons hidden={hidden.one} setHidden={() => setHidden(prev => ({...prev, one: !prev.one}))} />
        </div>

        <div>
          <label htmlFor='cpassword'>Confirm Password*</label>
          <input value={data.cpassword} onChange={dataUpdater} required type={hidden.two ? 'password' : 'text'} name='cpassword' id='cpassword' placeholder='Password' />
          <EyeIcons hidden={hidden.two} setHidden={() => setHidden(prev => ({...prev, two: !prev.two}))} />
        </div>

        <div className='checkbox'>
          <input onChange={dataUpdater} checked={data.officer} className='o-checkbox' type='checkbox' name='officer' id='officer' />
          <label htmlFor='officer'>Are you an officer?</label>
        </div>

        <p className='error-message'>{errMsg}</p>

        <button disabled={ui.disable} style={{background: ui.color}} type='submit'>{ui.text}</button>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
    </form>
    </div>
  )
}
