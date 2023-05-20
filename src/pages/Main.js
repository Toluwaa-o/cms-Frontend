import Dashboard from "../components/Dashboard/Dashboard"
import {Outlet} from 'react-router-dom'

export default function Main() {
  return (
    <div className="main">
    <header>
      <Dashboard />
    </header>

    <main>
      <Outlet />
    </main>
    </div>
  )
}
