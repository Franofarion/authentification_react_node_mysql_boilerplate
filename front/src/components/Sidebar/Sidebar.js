import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { logOut } from "../../utils/session";

export default function Sidebar() {
  const location = useLocation();
  const history = useHistory();
  const routes = [
    {
      name: "Posts",
      redirect: "/posts",
    },
    {
      name: "Dashboard",
      redirect: "/dashboard",
    },
  ];

  const handleLogout = () => {
    logOut();
    history.push("/login");
  };
  console.log(location.pathname);

  return (
    <div className="Sidebar">
      <div className="Sidebar-upper">
        <div className="Sidebar-logo">
          <img src="logo.png" alt="logo" />
        </div>
        <div className="Sidebar-menu">
          {routes.map((route) => (
            <NavLink
              className={`Sidebar-link ${
                location.pathname === route.redirect
                  ? "Sidebar-link-active"
                  : null
              }`}
              to={route.redirect}
            >
              <li>{route.name}</li>
            </NavLink>
          ))}
        </div>
      </div>
      <div className="Sidebar-signout" onClick={() => handleLogout()}>
        <img src="signout.png" alt="Sign out" />
        <span>Sign out</span>
      </div>
    </div>
  );
}
