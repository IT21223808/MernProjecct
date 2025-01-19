import React, { useState, useEffect } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import adminimage from './person12.jpg';

function Header() {
  const [admindata, setAdmindata] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getAdmin = async () => {
    try {
      const response = await axios.get("http://localhost:8080/login/sucess", {
        withCredentials: true,
      });
      if (response.data.admin) {
        setAdmindata(response.data.admin);
      } else {
        console.log("Not authorized");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    window.open("http://localhost:8080/logout", "_self");
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <h1>Project</h1>
        </div>
        <div className="right">
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >

          </button>
          <ul className={isMenuOpen ? "menu open" : "menu"}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {admindata && Object.keys(admindata).length > 0 ? (
              <>
                <li style={{ color: "black", fontWeight: "bold" }}>
                  {admindata?.displayName}
                </li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/logout" className="nav-link">
                    Logout
                  </NavLink>
                </li>
                <li>
                  <img
                    src={adminimage}
                    style={{ width: "50px", borderRadius: "50%" }}
                    alt="Admin"
                  />
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
