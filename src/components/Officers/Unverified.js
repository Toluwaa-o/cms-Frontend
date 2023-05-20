import { UserActions } from "../../stores/UserSlice"
import { useDispatch } from 'react-redux'

export default function Unverified({ firstName, lastName, email, number, id, clicker }) {
    const dispatch = useDispatch()
    
    const verify = () => {
        dispatch(UserActions.getId({ id, method: 'patch'}))
        clicker()
    }

    const deleteUser = () => {
        dispatch(UserActions.getId({ id, method: 'delete'}))
        clicker()
    }

  return (
    <div className="unverified">
        <div>
            <h3>{firstName} {lastName}</h3>
            <p>{email}</p>
            <p>{number}</p>
        </div>

        <div>
            <span style={{background: 'green'}} onClick={verify}>
                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 24 24" ><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
            </span>

            <span style={{background: 'rgb(243, 40, 40)'}} onClick={deleteUser}>
                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 24 24" ><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
            </span>
        </div>
    </div>
  )
}
