import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import BalanceCard from "../../cards/BalanceCard";
import TransCard from "../../cards/TransCard";
import SavingCard from "../../cards/SavingCard";
import DailyBalance from "../../cards/DailyBalance";
const Dashboard = () => {
  const navigate = useNavigate();
  const [userAccounts, setUserAccounts] = useState([]);
  const [status, setStatus] = useState(false);
  const [cookies, _, removeCookie] = useCookies([]);
  useEffect(() => {
    const accounts = async () =>{
      try{
        const {data} = await axios.get('http://localhost:5000/api/data/accounts',{
          withCredentials: true,
      });
      setUserAccounts(data);
      setStatus(true);
      console.log(userAccounts);
      }catch(error){
        console.log(error);
      }
    }
    accounts();
  }, [status]);

  return (
    <div className=" bg-clr_primary_200 bg-opacity-5 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
        <BalanceCard />
        <TransCard />
        <SavingCard/>

        <div className="bg-white flex flex-col gap-y-4 p-6 col-span-3 rounded shadow">
          <h2 className="text-xl font-semibold">accounts</h2>
          {userAccounts.map((account) =>(
            <div key={account._id} className="flex border-b mt-4 py-3 items-center justify-between">
            <p>{account.accountName}</p>
            <p>{`Rs ${account.balance}`}</p>
          </div>
          ))}
        </div>

        <div className="bg-white col-span-3 p-6 rounded shadow">
          <DailyBalance />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
