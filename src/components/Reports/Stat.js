import { Link } from 'react-router-dom'

export default function Stat({ title, count, color, icon, bcg, status }) {
  const route = status ? `cms-toluwaa-o.vercel.app/cms?category=all&sort=all&status=${status}` : 'cms-toluwaa-o.vercel.app/cms?category=all&sort=all'

  return (
    <Link to={route} style={{background: bcg, color: color}}>
          {icon}
          <span>
            <h3>{count}</h3>
            <p>{title}</p>
          </span>
    </Link>
  )
}
