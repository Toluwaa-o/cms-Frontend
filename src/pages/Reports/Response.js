import instance from '../../components/Axios/Config'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { UiActions } from '../../stores/UiSlice'
import { useDispatch } from 'react-redux'

export default function Response({ prevStatus, prevResponse, hide, reportId }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [errMsg, setErrMsg] = useState(null)

    const [data, setData] = useState({
        status: prevStatus,
        response: prevResponse
      })
    
    const [ui, setUi] = useState({
        text: 'Add Response',
        color: '#689425',
        disable: false
      })

    const dataUpdater = (e) => {
        const { name, value } = e.target
        setErrMsg(null)
        setData(prev => ({...prev, [name]: value}))
      }

    const submitData = (e) => {
        e.preventDefault()
        setUi({text: 'Hold on...', color: 'var(--lightBlue)', disable: true})
        setErrMsg(null)
    
        const responseData = { status: data.status, response: data.response }
    
        instance({
            url: `/reports/${reportId}/response`,
            method: 'patch',
            data: responseData,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(() => {
            hide()
            dispatch(UiActions.getMessage())
            navigate(`/cms/reports/${reportId}`)
        })
        .catch(err => {
            setUi({ text: 'Add Response', color: '#689425', disable: false })
    
            if(!err.response){
                return setErrMsg('Please check your connection and try again')
            }
    
            return setErrMsg(err.response.data.msg)
        })
      }
    
  return (
    <div className='response'>
        <form onSubmit={submitData}>
            <h2>Add Response</h2>
            <select onChange={dataUpdater} value={data.status} name='status' id='status'>
            <option value='pending'>Pending</option>
            <option value='active'>Active</option>
            <option value='responded'>Responded</option>
            </select>

            <label htmlFor='response'>Response Information</label>
            <textarea onChange={dataUpdater} value={data.response} name='response' id='response' required placeholder='How will you be responding?'></textarea>

            {<p style={{color: 'rgb(243, 40, 40)', textAlign: 'center'}}>{errMsg}</p>}
            <span>
                <button disabled={ui.disable} style={{background: ui.color}} type='submit'>{ui.text}</button>
                <p onClick={() => hide()} style={{background: 'rgb(243, 40, 40)'}}>Cancel</p>
            </span>
        </form>
    </div>
  )
}
