import { useNavigate } from "react-router";
import { useEffect } from "react";
import instance from "../Axios/Config";
import { useDispatch } from 'react-redux'
import { UserActions } from "../../stores/UserSlice";

export default function NoOfficerRoutes(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    instance({
      url: "/users/show-current-user",
      method: "get",
    })
      .then((res) => {
        dispatch(UserActions.getUser(res.data.user))
        if (res.data.user.userType === "officer") return navigate("/cms");
      })
      .catch(() => {
        return navigate("/cms");
      });
  }, []);

  return <>{props.children}</>;
}
