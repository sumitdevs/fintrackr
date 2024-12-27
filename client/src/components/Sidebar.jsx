import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoPieChart } from "react-icons/io5";
import { IoAlarmSharp } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { IoCalendarNumber } from "react-icons/io5";
import { FaFileExport } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa6";


import DashLink from "./DashLink";
const navData = [
  {
    name: "overview",
    url: "/dashboard",
    icon: <MdDashboard />
  },
  {
    name: "account",
    url: "/dashboard/account",
    icon: <MdAccountBalance />
  },
  {
    name: "transaction",
    url: "/dashboard/transaction",
    icon: <FaMoneyBillTransfer />
  },
  {
    name: "budget",
    url: "/dashboard/budget",
    icon: <IoPieChart />
  },
  {
    name: "credit cards",
    url: "/dashboard/credit-cards",
    icon: <FaCreditCard />
  },
  {
    name: "debts",
    url: "/dashboard/debts",
    icon: <IoAlarmSharp />
  },
  {
    name: "category",
    url: "/dashboard/category",
    icon: <MdCategory />
  },
  {
    name: "calender",
    url: "/dashboard/calender",
    icon: <IoCalendarNumber />
  },
  {
    name: "settings",
    url: "/dashboard/settings",
    icon: <IoMdSettings />
  },
]
const Sidebar = () => {
  return (
    <div id="sidebar" className="w-64   border">
    <div className="py-4">
    <Link to="/" className="py-3">
          <img
            className="h-6"
            src="/images/fintrackrlogo.svg"
            alt="logo"
          />
        </Link>
    </div>
      <DashLink navData={navData}/>
    </div>
  );
};

export default Sidebar;
