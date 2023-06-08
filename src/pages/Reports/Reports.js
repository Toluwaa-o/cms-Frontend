import { useEffect, useState } from "react";
import instance from "../../components/Axios/Config";
import Row from "../../components/Reports/Row";
import Loader from "../../components/UI/Loader";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Reports() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const userType = useSelector((state) => state.user.user.userType);

  const [filters, setFilter] = useState({
    search: "",
    category: "all",
    sort: "all",
    status: "all",
  });

  const [page, setPage] = useState({
    currPage: 1,
    uiPage: 1,
    numOfPages: 1,
  });

  const updateFilterData = (e) => {
    const { name, value } = e.target;

    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setData(null);
    let query = [];
    for (const entry of searchParams.entries()) {
      const [a, b] = entry;
      query.push(`${a}=${b}`);
    }

    query = query.join("&");

    instance
      .get(`reports?page=${page.currPage}&${query}`)
      .then((res) => {
        setData(res.data.reports);
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
  }, [searchParams, page.currPage]);

  const prodFilter = (e) => {
    e.preventDefault();
    setPage({
      currPage: 1,
      uiPage: 1,
      numOfPages: 1,
    });
    const queryObject = {};

    if (filters.search !== "") queryObject.search = filters.search;

    if (filters.category !== "") queryObject.category = filters.category;

    if (filters.sort !== "") {
      queryObject.sort = filters.sort;
    }

    queryObject.status = filters.status;
    setShowFilter(false);
    setSearchParams(queryObject);
  };

  return (
    <div className="reports">
      <div className="reports-top">
        <h2>Reports</h2>
        {userType !== "officer" && (
          <Link to="create-report">
            Create Report
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
          </Link>
        )}
      </div>

      <form
        className={
          showFilter ? "showFilter reports-middle" : "hideFilter reports-middle"
        }
        onSubmit={prodFilter}
      >
        <select
          onChange={updateFilterData}
          name="category"
          id="category"
          value={filters.category}
        >
          <option disabled value="all">
            All Categories
          </option>
          <option value="Crime against person(s)">
            Crime against person(s)
          </option>
          <option value="Crime against property">Crime against property</option>
          <option value="Hate crime">Hate crime</option>
          <option value="Crime against morality">Crime against morality</option>
          <option value="White-Collar crime">White-Collar crime</option>
          <option value="Organized crime">Organized crime</option>
        </select>

        <select
          onChange={updateFilterData}
          name="sort"
          id="sort"
          value={filters.sort}
        >
          <option disabled value="">
            Sort By
          </option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="latest">Latest - Oldest</option>
          <option value="oldest">Oldest - Latest</option>
        </select>

        <select
          onChange={updateFilterData}
          name="status"
          id="status"
          value={filters.status}
        >
          <option value="all">Sort By Status</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="responded">Responded</option>
        </select>

        <div>
          <label htmlFor="search">Search:</label>
          <input
            onChange={updateFilterData}
            value={filters.search}
            type="text"
            name="search"
            id="search"
            placeholder="Search based on title"
          />
        </div>

        <button type="submit">Filter</button>
      </form>
      {!showFilter ? (
        <svg
          onClick={() => setShowFilter((prev) => !prev)}
          width="40"
          height="25"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs></defs>
          <title />
          <g data-name="Layer 2" id="Layer_2">
            <path
              className="cls-1"
              d="M16.47,16.88,26.34,7a1,1,0,0,0-1.41-1.41l-9.06,9.06-8.8-8.8a1,1,0,0,0-1.41,0h0a1,1,0,0,0,0,1.42l9.61,9.61A.85.85,0,0,0,16.47,16.88Z"
            />
            <path
              className="cls-1"
              d="M16.47,26.46l9.87-9.88a1,1,0,0,0-1.41-1.41l-9.06,9.06-8.8-8.8a1,1,0,0,0-1.41,0h0a1,1,0,0,0,0,1.41l9.61,9.62A.85.85,0,0,0,16.47,26.46Z"
            />
          </g>
        </svg>
      ) : (
        <svg
          onClick={() => setShowFilter((prev) => !prev)}
          width="40"
          height="25"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs></defs>
          <title />
          <g data-name="Layer 2" id="Layer_2">
            <path
              className="cls-1"
              d="M16.47,15.12,26.34,25a1,1,0,0,1-1.41,1.41l-9.06-9.06-8.8,8.8a1,1,0,0,1-1.41,0h0a1,1,0,0,1,0-1.42l9.61-9.61A.85.85,0,0,1,16.47,15.12Z"
            />
            <path
              className="cls-1"
              d="M16.47,5.54l9.87,9.88a1,1,0,0,1-1.41,1.41L15.87,7.77l-8.8,8.8a1,1,0,0,1-1.41,0h0a1,1,0,0,1,0-1.41l9.61-9.62A.85.85,0,0,1,16.47,5.54Z"
            />
          </g>
        </svg>
      )}

      {data ? (
        data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Category</th>
                <th>Status</th>
                <th>Location</th>
              </tr>
            </thead>

            <tbody>
              {data.map((rep) => {
                return (
                  <Row
                    key={rep._id}
                    title={rep.title}
                    description={rep.description.slice(0, 40)}
                    category={rep.category}
                    status={rep.status}
                    location={rep.location}
                    id={rep._id}
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
            No reports found
          </p>
        )
      ) : (
        <Loader />
      )}
      {err && <p className="error-message">{err}</p>}
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
