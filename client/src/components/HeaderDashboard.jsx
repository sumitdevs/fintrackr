import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const HeaderDashboard = () => {
  const [cookies, _, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCookie("token", { path: "/" });
    navigate("/");
  };
  const closeSidebar = ()=>{
    const form = document.getElementById('sidebar');
    form.classList.toggle('hidden');
  }
  return (
    <header className="pb-4  bg-white border-gray-300 w-full  px-8">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-x-4 ">
          <button onClick={closeSidebar}>
            <svg
              className="w-7 aspect-square"
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
          <p>Overviews</p>
        </div>
        <div className="flex gap-x-4">
          <a className="text-2xl" href="#">
            <IoSearch />
          </a>
          <a className="text-2xl" href="#">
            <IoIosNotifications />
          </a>
          <a className="text-2xl" href="#">
            <CgProfile />
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
