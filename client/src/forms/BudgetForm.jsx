import React, { useState, useEffect} from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const BudgetForm = ({setForm, data}) => {
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [budget, setBudget] = useState({
    amount: "",
    category: "",
    account: "",
    duration: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBudget({ ...budget, [name]: value });
  };

  useEffect(()=>{
    const setData =()=>{
      setBudget({
        amount: data.amount,
        category: data.category,
        account: data.account,
        duration: data.timeFrames,
      });
    }
    const loadCategory = async ()=>{
      const {data} = await axios.get('http://localhost:5000/api/data/category',{
        withCredentials:true
      });
      console.log(data)
      setCategories([...data.filter((data)=>data.type === 'expense' )]);
    }
    const loadAccount = async () => {
      const {data} = await axios.get('http://localhost:5000/api/data/accounts',{
        withCredentials:true,
      });
      console.log(data);
      setAccounts([...data]);
    }
    data && setData();
    loadCategory();
    loadAccount();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(data){
          const {status} = await axios.put(`http://localhost:5000/api/data/budget/${data._id}`, budget, {
            withCredentials:true,
          });
          if(status === 200) setForm();
      } else {
        const {status} =  await axios.post('http://localhost:5000/api/data/budget', budget, {
          withCredentials:true
        });
        if(status === 200) setForm();
      }
    } catch(error){
      console.log(error);
    }
  };

  return (
    <div className='fixed inset-0  z-20 bg-gray-500 bg-opacity-10 '>
      <div className="max-w-lg mx-auto relative mt-20 bg-white p-6 rounded-lg shadow-md">
         <button onClick={setForm}  className='absolute text-xl top-4 right-6'><RxCross2/></button>
        <h2 className="text-xl font-bold mb-4">Set a Budget</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={budget.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          {/* Category Dropdown */}
          <div>
            <label htmlFor="categoryBudget" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
                id="categoryBudget"
                required
                name="category"
                value={budget.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-lg"
              >
        <option value="">Select an option</option>
        {categories.map((category) => (
          <optgroup key={category._id} label={category.name} className="font-semibold text-gray-800">
            {category.subCat.map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
          </div>
          {/* Account Dropdown */}
          <div>
            <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">
              Account
            </label>
            <select
              id="account"
              name="account"
              value={budget.account}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            >
              <option value="">Select Account</option>
              {accounts.map((acc, index) => (
                <option key={index} value={acc.accountName}>
                  {acc.accountName}
                </option>
              ))}
            </select>
          </div>
          {/* Duration Dropdown */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration
            </label>
            <select
              id="duration"
              name="duration"
              value={budget.duration}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            >
              <option value="">Select Duration</option>
              {["weekly", "monthly"].map((dur, index) => (
                <option key={index} value={dur}>
                  {dur}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Save Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;
