import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-link");
    // const navCollapse = document.getElementById("navbarNav");

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        setIsCollapsed(true);
      });
    });

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener("click", () => { });
      });
    };
  }, []);


  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg fixed-top navbar-scroll navbar-light bg-light">
          <div className="container-fluid">
            <img
              src="https://knowledge.skema.edu/wp-content/uploads/2020/10/shutterstock_1356273047-scaled.jpg"
              height="70"
              alt="Logo"
            />
            <NavLink to="/" id="title" style={{textDecoration: "none", color: "black"}}>Crowd Funding</NavLink>
            <button
              className={`navbar-toggler ${!isCollapsed ? "" : "collapsed"}`}
              type="button"
              // data-bs-toggle="collapse"
              // data-bs-target="#navbarNav"
              onClick={toggleNavbar}
              aria-controls="navbarNav"
              aria-expanded={!isCollapsed}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon">
                {/* <i className="fas fa-bars"></i> */}
              </span>
            </button>
            <div className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`} id="navbarNav">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">Home&nbsp;</NavLink>
                </li>
                {
                  role === "admin" ? (
                    <>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/addCharity">Add Charity</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/viewCharity">View Charity</NavLink>
                      </li>
                    </>
                  ) : role === "donor" ? (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/donateCharity">Donate Charity</NavLink>
                    </li>
                  ) : null}
              </ul>
              {role ? (
                <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>Logout</button>
              ) : (
                <div className="d-flex">
                  <NavLink to="/register">
                    <button className="btn btn-outline-primary me-2">Register</button>
                  </NavLink>
                  &nbsp;&nbsp;
                  <NavLink to="/login">
                    <button className="btn btn-outline-success">Sign In</button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
