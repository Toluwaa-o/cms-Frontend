import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom"
import Page from "./page"
import AdminRoutes from "../components/RouteProtection/AdminRoutes"
import OfficerRoutes from "../components/RouteProtection/OfficerRoutes"
import UserRoutes from "../components/RouteProtection/UserRoutes"
import Register from '../pages/Auth/Registration'
import Login from '../pages/Auth/Login'
import Main from '../pages/Main'
import Reports from '../pages/Reports/Reports'
import Officers from '../pages/Officers/Officers'
import Stats from '../pages/Reports/Stats'
import EditReport from '../pages/Reports/EditReport'
import CreateReport from "../pages/Reports/CreateReport"
import ExpandedReport, {reportData} from '../pages/Reports/ExpandedReport'
import NoOfficerRoutes from "../components/RouteProtection/NoOfficerRoutes"
import Error from '../pages/Error/Error'
import User, {profileLoader} from "../pages/User/User"
import Change from "../pages/Auth/Change"
import Logout from "../pages/Auth/Logout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Page />} errorElement={<Error />}>
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
      <Route path='forgotten' element={<Change />} />
      <Route path='logout' element={<Logout />} />
      <Route path='cms' element={<UserRoutes><Main /></UserRoutes>} >
        <Route index element={<Reports />} />
        <Route path='profile/:id' element={<User />} loader={profileLoader} />
        <Route path='reports/:id' element={<ExpandedReport />} loader={reportData} />
        <Route path='reports/:id/update' element={<NoOfficerRoutes><EditReport /></NoOfficerRoutes>} />
        <Route path="create-report" element={<NoOfficerRoutes><CreateReport /></NoOfficerRoutes>} />
        <Route path='officers' element={<AdminRoutes><Officers /></AdminRoutes>} />
        <Route path='stats' element={<OfficerRoutes><Stats /></OfficerRoutes>} />
      </Route>
    </Route>
  )
)

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}