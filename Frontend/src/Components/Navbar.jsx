import { Link } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
function Navbar() {
  const [user,setuser]=useState("");
  const [login,setlogin]=useState(false);
  useEffect(()=>{
    axios.get("http://localhost:8080/LFPortal/Profile",{withCredentials: true})
    .then(res=>{
      setuser(res.data.user.name);
      setlogin(true);
    })
    .catch(err=>{
      setuser("");
      setlogin(false);
    })
  },[]);

  const Logout=(e)=>{
    e.preventDefault();
    axios.get("http://localhost:8080/LFPortal/Logout",{withCredentials: true})
    .then(res=>{
      setlogin(false);
      setuser("");
    })
    .catch(err=>{
      console.log("Logout failed", err);
    })
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center text-dark ms-4" to="/">
          {/* <img src="BVRITlogo.png" alt="logo" width="80" /> */}
          <h2 className="ms-2 mb-0">LFPortal</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <form className="d-flex mx-auto my-2" role="search" style={{ width: "40%" }}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for item"
              aria-label="Search"
            />
            <button className="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
            {login?<li className="nav-item me-3"><Link className="nav-link active text-dark" onClick={Logout}>Logout</Link></li>:<li className="nav-item me-3"><Link className="nav-link active text-dark" to="/Login">Login</Link></li>}
            <li className="nav-item me-3">
              <Link className="nav-link active text-dark" to="/Owner">About Owner</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link active text-dark" to="/ReportProduct">Report</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link active text-dark" to="/Feedback">Feedback</Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link active text-dark" to="/Support">Support</Link>
            </li>
            {login && (
              <li className="nav-item me-2">
                <h6 className="mb-0"><i className="fa-regular fa-user"></i> {user}</h6>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
