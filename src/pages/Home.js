import Logo from "../images/logo_transparent.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="homepage">
      <img src={Logo} alt="logo" />
      <div>
        <p>
          This is an internet-based application, proposed to connect the police
          and the public. It enables anonymous crime reporting and information
          sharing, helping law enforcement identify culprits and improve their
          handling of cases. The aim is to create an environment where crimes
          can be reported openly and promptly, with coordinated responses to
          victims' reports.
        </p>

        <span>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign Up</Link>
        </span>
      </div>
    </main>
  );
};
export default Home;
