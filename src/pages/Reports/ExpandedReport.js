import { useLoaderData } from 'react-router'
// import Loader from '../../components/UI/Loader'
import { Link } from 'react-router-dom'
import instance from '../../components/Axios/Config'
import { useSelector } from 'react-redux'

export default function ExpandedReport() {
    const report = useLoaderData()
    const userType = useSelector(state => state.user.user.userType)
    const date = new Date(report.data.report.createdAt)
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    const day = date.getDate()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const time = date.getTime()
    const timeCode = new Date(time).toISOString().slice(11, 16)
    const period = Number(timeCode.slice(0, 2)) < 12 ? 'AM' : 'PM'

    const update = new Date(report.data.report.updatedAt)
    const updateDay = update.getDate()
    const updateMonth = update.getMonth()+1
    const updateYear = update.getFullYear()
    const updateTime = update.getTime()
    const updateCode = new Date(updateTime).toISOString().slice(11, 16)
    const updatePeriod = Number(updateCode.slice(0, 2)) < 12 ? 'AM' : 'PM'
    return (
        <div className='expanded-report'>
            <Link to='/cms'>Back</Link>
            {report ? <>
                <div>
                    <h3>Report {report.data.report._id}</h3>
                    <p><span>Title:</span> {report.data.report.title}</p>
                    <p><span>Reported at:</span> {day}{day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'}, {months[month]} {year}, {timeCode} {period}</p>
                    <p><span>Category:</span> {report.data.report.category}</p>
                    <p><span>Created By:</span> {report.data.report.createdBy.firstName} {report.data.report.createdBy.lastName}</p>
                    <p><span>Location:</span> {report.data.report.location}</p>
                    <p style={{color: report.data.report.status === 'pending' ? '#d66a6a' : report.data.report.status === 'active' ? '#e9b949' : '#647acb', textTransform: 'capitalize', fontWeight: '700'}}><span>Status:</span> {report.data.report.status}</p>
                </div>
                <div>
                    <p><span>Description:</span> {report.data.report.description}</p>
                    <span>
                        {report.data.report.media.length > 0 && <span>Images/Videos</span>}
                        <div>
                            {report.data.report.media.length > 0 && report.data.report.media.map(img => <img key={img} src={img} alt={report.data.report.title} />)}
                        </div>
                    </span>
                </div>
                <div>
                    <h2>Response Info</h2>
                    {report.data.report.response && <>
                     <p><span>Updated at:</span> {updateDay}{updateDay === 1 ? 'st' : updateDay === 2 ? 'nd' : updateDay === 3 ? 'rd' : 'th'}, {months[updateMonth]} {updateYear}, {updateCode} {updatePeriod}</p>
                    <p><span>Description:</span> {report.data.report.response}</p></>}
                </div>
                {userType !== 'officer' && <Link to='update' >Update Report</Link>}
            </> : <p style={{padding: '1em', textAlign: 'center', fontWeight: '700', color: 'var(--darkBlue)'}}>Something went wrong, please try again</p>}
        </div>
    )
}

export const reportData = async ({params}) => {
    const result = await instance.get(`/reports/${params.id}`)

    return result
}