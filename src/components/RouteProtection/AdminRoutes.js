import { useNavigate } from "react-router";
import { useEffect } from "react";
import instance from "../Axios/Config";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../stores/UserSlice";

export default function AdminRoutes(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      if (user.userType !== "admin") return navigate("/cms");
      else return;
    } else {
      instance({
        url: "/users/show-current-user",
        method: "get",
      })
        .then((res) => {
          dispatch(UserActions.getUser(res.data.user));
          if (res.data.user.userType !== "admin") return navigate("/cms");
        })
        .catch(() => {
          return navigate("/cms");
        });
    }
  }, []);

  return <>{user.userType === "admin" && props.children}</>;
}
