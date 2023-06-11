import React, { useContext, useEffect, useState } from "react";
import { FaCanadianMapleLeaf,FaShoppingCart } from "react-icons/fa";
import Button from "./Button";
import Avaratr from "./Avaratr";
import { Link } from "react-router-dom";
import DarkmodeToggle from "./DarkmodeToggle";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  //TODO: DARK MODE WORK
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // document.querySelector('html').setAttribute('data-theme')
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);
  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/instructors">Instructors</Link>
      </li>
      <li>
        <Link to="/classes">Classes</Link>
      </li>
      {user && (
        <li className="">
          <Link to="/dashboard">
           Dashboard
          </Link>
        </li>
      )}
      <li>
        <DarkmodeToggle
          theme={theme}
          handleToggle={handleToggle}
        ></DarkmodeToggle>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <FaCanadianMapleLeaf size={35} className="text-blue-500" />
          <a className="btn btn-ghost normal-case text-xl">MEDLIFE LC</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end flex gap-2">
          {user ? (
            <>
              <Avaratr></Avaratr>
              <button className="btn btn-error" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Button content="Login" link="login"></Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
