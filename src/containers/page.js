import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "../components/UI/PopUpMessage";
import { UiActions } from "../stores/UiSlice";
import { UserActions } from "../stores/UserSlice";
import instance from "../components/Axios/Config";
import Loading from "../components/UI/Loader";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

export default function Page() {
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const message = useSelector((state) => state.ui.message);
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/forgotten"
    )
      return setRender(true);

    if(!user){
      instance({
        url: "/users/show-current-user",
        method: "get",
      })
        .then((res) => {
          dispatch(UserActions.getUser(res.data.user));
          setRender(true);
        })
        .catch(() => {
          setRender(true);
          return navigate("/login");
        });
    }else {
      setRender(true);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(UiActions.clearMessage());
    }, 1500);
  }, [message]);

  return (
    <>
      {render ? <Outlet /> : <Loading />}
      {message && <Popup />}
    </>
  );
}
