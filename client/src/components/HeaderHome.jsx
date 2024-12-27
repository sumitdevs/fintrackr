import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
const HeaderHome = () => {
  const [cookies, _, removeCookie] = useCookies([]);
  const [user, setUser] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      const { user, status } = data;
      setUser(user);
      setStatus(status);
    };

    fetchUser();
  }, [status]);

  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    setStatus(false);
    // navigate("/");
  };

  const handleProfile = () => {
    const profile = document.getElementById("profile");
    profile.classList.toggle("hidden");
  };

  const handleMenu = () => {
    const iconClose = document.getElementById("icon-close");
    const iconHam = document.getElementById("icon-ham");
    iconClose.classList.toggle("hidden");
    iconHam.classList.toggle("hidden");
  };

  return (
    <header className="shadow-sm relative">
      <div className="container font-ff_primary flex w-full items-center justify-between lg:justify-normal py-2 ">
        <Link to="/" className="py-3">
          <img
            className="h-7 w-44"
            src="/images/fintrackrlogo.svg"
            alt="logo"
          />
        </Link>
        <div id="icon-ham" className=" lg:hidden">
          <button
          onClick={handleMenu}
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <svg
              className="w-8 aspect-square"
              fill="#efefef"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#13629F"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <nav className=" hidden lg:flex  items-center flex-1 ml-12">
          <div className=" lg:flex lg:gap-x-12 ">
            <Link to="about">About Us</Link>
            <Link to="features">Features</Link>
            <Link to="contact">Contact</Link>
          </div>
          <div
            className={
              (status ? "lg:hidden " : "lg:flex ") +
              "hidden gap-x-12 lg:flex-1 lg:justify-end"
            }
          >
            <Link className="bg-clr_accent_200 px-4 py-2 rounded-lg text-white hover:bg-clr_accent_100 hover:text-white focus:text-white" to="/login">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <div
          className={
            (status ? "lg:flex " : "lg:hidden ") +
            "hidden gap-x-12  lg:flex-1 lg:items-end flex-col relative"
          }
        >
          <button
            onClick={handleProfile}
            className="w-10 flex justify-center items-center aspect-square border border-clr_accent_200 rounded-full "
          >
            <IoPerson className="text-clr_primary_300" />
          </button>
          <div
            id="profile"
            className="absolute hidden shadow-md bg-white text-center top-12 -right-10 rounded-sm text-black
            px-6 py-4"
          >
            <p>{user}</p>
            <Link className="block my-2 text-clr_primary_300"  to="/dashboard">Dashboard</Link>
            <Link className="text-clr_primary_300" onClick={handleLogout}>Logout</Link>
          </div>
        </div>
      </div>
      <div
        id="icon-close"
        className="md:hidden hidden fixed w-full h-screen inset-0  bg-gradient-to-b from-clr_primary_100/90 to-clr_accent_200/90 "
      >
        <button
        onClick={handleMenu}
          type="button"
          className="inline-flex items-center justify-center rounded-md absolute right-8 top-5  text-gray-700"
        >
          <svg
            id="close-icon"
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <nav className="flex mt-20 flex-col space-y-10 text-center">
            <Link to="/about">About Us</Link>
            <Link to="/features">Features</Link>
            <Link to="contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default HeaderHome;
