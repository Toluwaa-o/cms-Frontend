import Row from "../../components/Officers/Row";
import Loader from "../../components/UI/Loader";
import { useEffect, useState } from "react";
import instance from "../../components/Axios/Config";
import Unverified from "../../components/Officers/Unverified";
import DialogueBox from "../../components/UI/DialogueBox";
import { useSelector, useDispatch } from "react-redux";
import { UserActions } from "../../stores/UserSlice";
import { UiActions } from "../../stores/UiSlice";
import { useSearchParams } from "react-router-dom";

export default function Officers() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [section, setSection] = useState("officers");
  const [showDialogue, setShowDialogue] = useState(false);
  const id = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  let [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilter] = useState({
    search: "",
  });

  const updateFilterData = (e) => {
    const { name, value } = e.target;

    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const [page, setPage] = useState({
    currPage: 1,
    uiPage: 1,
    numOfPages: 1,
  });

  useEffect(() => {
    setData(null);
    let query = [];
    for (const entry of searchParams.entries()) {
      const [a, b] = entry;
      query.push(`${a}=${b}`);
    }

    if (section === "officers") {
      query = query.join("&");
    } else {
      query = "";
    }

    instance
      .get(`/users/${section}?page=${page.currPage}&${query}`)
      .then((res) => {
        setData(res.data.users);
        setPage((prev) => ({
          ...prev,
          numOfPages: res.data.numOfPages,
          uiPage: page.currPage,
        }));
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setData([]);
        } else {
          setErr("Something went wrong, please try again!");
        }
      });
  }, [section, searchParams, page.currPage]);

  const confirmAction = () => {
    if (id.method === "patch") {
      instance({
        url: `/users/${id.id}`,
        data: { verified: true },
        method: "patch",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setShowDialogue(false);
          setPage({
            currPage: 1,
            uiPage: 1,
            numOfPages: 1,
          });
          setSection("officers");
          dispatch(UserActions.clearId());
          dispatch(UiActions.getMessage());
        })
        .catch((err) => {
          throw new Error("Something went wrong");
        });
    } else {
      instance({
        url: `/users/${id}`,
        method: "delete",
      })
        .then(() => {
          setShowDialogue(false);
          setPage({
            currPage: 1,
            uiPage: 1,
            numOfPages: 1,
          });
          setSection("officers");
          dispatch(UserActions.clearId());
          dispatch(UiActions.getMessage());
        })
        .catch((err) => {
          throw new Error("Something went wrong");
        });
    }
  };

  const officerFilter = (e) => {
    e.preventDefault();
    setPage({
      currPage: 1,
      uiPage: 1,
      numOfPages: 1,
    });
    const queryObject = {};

    if (filters.search !== "") queryObject.search = filters.search;

    setSearchParams(queryObject);
  };

  return (
    <div className="officers">
      <div className="officers-top">
        <h2>Officers</h2>
      </div>
      <div className="officer-groups">
        <p
          style={{
            borderBottom: section === "officers" ? "3px solid green" : null,
          }}
          onClick={() => {
            setSection("officers");
            setPage({
              currPage: 1,
              uiPage: 1,
              numOfPages: 1,
            });
            setData(null);
          }}
        >
          Verified Officers
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 24 24"
            style={{ fill: "green" }}
          >
            <path d="M8 12.052c1.995 0 3.5-1.505 3.5-3.5s-1.505-3.5-3.5-3.5-3.5 1.505-3.5 3.5 1.505 3.5 3.5 3.5zM9 13H7c-2.757 0-5 2.243-5 5v1h12v-1c0-2.757-2.243-5-5-5zm11.294-4.708-4.3 4.292-1.292-1.292-1.414 1.414 2.706 2.704 5.712-5.702z"></path>
          </svg>
        </p>
        <p
          style={{
            borderBottom:
              section === "officers/unverified" ? "3px solid red" : null,
          }}
          onClick={() => {
            setSection("officers/unverified");
            setPage({
              currPage: 1,
              uiPage: 1,
              numOfPages: 1,
            });
            setData(null);
          }}
        >
          Unverified Officers
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 24 24"
            style={{ fill: "red" }}
          >
            <path d="M8 12.052c1.995 0 3.5-1.505 3.5-3.5s-1.505-3.5-3.5-3.5-3.5 1.505-3.5 3.5 1.505 3.5 3.5 3.5zM9 13H7c-2.757 0-5 2.243-5 5v1h12v-1c0-2.757-2.243-5-5-5zm11.293-4.707L18 10.586l-2.293-2.293-1.414 1.414 2.292 2.292-2.293 2.293 1.414 1.414 2.293-2.293 2.294 2.294 1.414-1.414L19.414 12l2.293-2.293z"></path>
          </svg>
        </p>
      </div>
      {section === "officers" && (
        <form className="officers-middle" onSubmit={officerFilter}>
          <input
            value={filters.search}
            onChange={updateFilterData}
            type="text"
            name="search"
            id="search"
            placeholder="Search based on first name"
            aria-label="search"
          />
          <button>Search</button>
        </form>
      )}

      {section === "officers" ? (
        data ? (
          data.length > 0 ? (
            <table>
              <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Location</th>
                </tr>
              </thead>

              <tbody>
                {data.map((off) => {
                  return (
                    <Row
                      key={off._id}
                      firstName={off.firstName}
                      lastName={off.lastName}
                      email={off.email}
                      number={off.contact}
                      address={off.address}
                    />
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p
              style={{
                padding: "1em",
                textAlign: "center",
                fontWeight: "700",
                color: "var(--darkBlue)",
              }}
            >
              No Officers found
            </p>
          )
        ) : (
          <Loader />
        )
      ) : data ? (
        data.length > 0 ? (
          data.map((d) => {
            return (
              <Unverified
                firstName={d.firstName}
                key={d._id}
                lastName={d.lastName}
                email={d.email}
                number={d.number}
                id={d._id}
                clicker={() => setShowDialogue(true)}
              />
            );
          })
        ) : (
          <p
            style={{
              padding: "1em",
              textAlign: "center",
              fontWeight: "700",
              color: "var(--darkBlue)",
            }}
          >
            No Unverified Officers found
          </p>
        )
      ) : (
        <Loader />
      )}
      {err && <p className="error-message">{err}</p>}
      {showDialogue && (
        <DialogueBox
          decline={() => {
            setShowDialogue(false);
            dispatch(UserActions.clearId());
          }}
          confirm={confirmAction}
        />
      )}
      <div className="pagination">
        <span
          onClick={() => {
            if (page.currPage > 1) {
              setPage((prev) => ({ ...prev, currPage: prev.currPage - 1 }));
            }
          }}
          style={{
            background: page.currPage === 1 ? "#34495E70" : "var(--darkBlue)",
          }}
        >
          <svg
            style={{ fill: page.currPage === 1 ? "gray" : "white" }}
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
          >
            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
          </svg>
        </span>
        <p>
          Page {page.currPage} of {page.numOfPages}
        </p>
        <span
          onClick={() => {
            if (page.currPage < page.numOfPages) {
              setPage((prev) => ({ ...prev, currPage: prev.currPage + 1 }));
            }
          }}
          style={{
            background:
              page.currPage === page.numOfPages
                ? "#34495E70"
                : "var(--darkBlue)",
          }}
        >
          <svg
            style={{
              fill: page.currPage === page.numOfPages ? "gray" : "white",
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
          >
            <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
          </svg>
        </span>
      </div>
    </div>
  );
}
