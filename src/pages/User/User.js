import { useState } from "react";
import instance from "../../components/Axios/Config";
import { useLoaderData } from "react-router";
import { useNavigate } from "react-router-dom";
import { UiActions } from "../../stores/UiSlice";
import { useDispatch } from "react-redux";

export default function User() {
  const navigate = useNavigate();
  const myData = useLoaderData();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    firstName: myData.data.user.firstName,
    lastName: myData.data.user.lastName,
    email: myData.data.user.email,
    number: myData.data.user.contact,
    address: myData.data.user.address,
  });

  const dataUpdater = (e) => {
    const { name, value } = e.target;
    setErrMsg(null);

    if (name === "officer")
      return setData((prev) => ({ ...prev, officer: !prev.officer }));
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const [ui, setUi] = useState({
    text: "Update Profile",
    color: "#689425",
    disable: false,
  });

  const [errMsg, setErrMsg] = useState(null);

  const submitData = (e) => {
    e.preventDefault();

    setUi({ text: "Hold on...", color: "var(--lightBlue)", disable: true });
    setErrMsg(null);

    let mailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (data.firstName === "" || data.lastName === "" || data.email === "") {
      setUi({ text: "Update Profile", color: "#689425", disable: false });
      return setErrMsg("Please provide all the required information");
    }

    if (!data.email.match(mailRegEx)) {
      setUi({ text: "Update Profile", color: "#689425", disable: false });
      return setErrMsg("Please provide a valid email");
    }

    const { firstName, lastName, email } = data;

    const formData = { firstName, lastName, email };

    if (data.number !== "") formData.contact = data.number;
    if (data.address !== "") formData.address = data.address;

    instance({
      url: `/users/${myData.data.user._id}`,
      method: "patch",
      data: formData,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        dispatch(UiActions.getMessage());
        navigate("/cms");
      })
      .catch((err) => {
        setUi({ text: "Update Profile", color: "#689425", disable: false });
        if (!err.response) {
          return setErrMsg("Please check your connection and try again");
        }

        if (err.response.status === 404) {
          setErrMsg("Please provide all necessary values");
        } else {
          setErrMsg(err.response.data.msg);
        }
      });
  };

  return (
    <div className="profile">
      <form onSubmit={submitData}>
        <h2>My Profile</h2>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            value={data.firstName}
            onChange={dataUpdater}
            required
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={data.lastName}
            onChange={dataUpdater}
            required
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            value={data.email}
            onChange={dataUpdater}
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
          />
        </div>

        <div>
          <label htmlFor="number">Phone Number</label>
          <input
            value={data.number}
            onChange={dataUpdater}
            type="tel"
            name="number"
            id="number"
            placeholder="Phone Number"
          />
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            value={data.address}
            onChange={dataUpdater}
            type="text"
            name="address"
            id="address"
            placeholder="Address"
          />
        </div>

        <p className="error-message">{errMsg}</p>

        <button
          disabled={ui.disable}
          style={{ background: ui.color }}
          type="submit"
        >
          {ui.text}
        </button>
      </form>
    </div>
  );
}

export const profileLoader = async ({ params }) => {
  const data = await instance.get(`/users/${params.id}`);

  return data;
};
