import { useNavigate } from "react-router";
import { useEffect } from "react";
import instance from "../Axios/Config";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../stores/UserSlice";

export default function UserRoutes(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      return;
    } else {
      instance({
        url: "/users/show-current-user",
        method: "get",
      })
        .then((res) => {
          dispatch(UserActions.getUser(res.data.user));
          if (!res.data.user) return navigate("/login");
        })
        .catch(() => {
          return navigate("/login");
        });
    }
  }, []);

  return <>{user && props.children}</>;
}
