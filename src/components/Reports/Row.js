import { Link } from 'react-router-dom'

export default function Row({title, description, category, status, location, id}) {
  return (
    <tr>
        <td>{title}</td>
        <td>{description}....</td>
        <td>{category}</td>
        <td style={{color: status === 'pending' ? '#d66a6a' : status === 'active' ? '#e9b949' : '#647acb', textTransform: 'capitalize', fontWeight: '700'}}>{status}</td>
        <td>{location}</td>
        <td><Link to={'reports/' + id} >View</Link></td>
    </tr>
  )
}
