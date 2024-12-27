import React, { useState, useEffect } from "react";
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";

const CreditForm = ({type, setType, data, onClose}) => {
  const [formData, setFormData] = useState({
    category: "",
    value: "",
    account: "",
    date: "",
    time: "",
    notes: "",
  });

const [categories, setCategories] = useState([]);
const [accounts, setAccounts] =  useState([]);

  useEffect(()=>{
    const setEditData = (data)=>{
      setFormData({
        category: data.category,
        value: data.amount,
        account: data.account,
        date: (data.date).split('T')[0],
        time: data.time,
        notes: data.notes,
      })
    }
    const loadCategory = async ()=>{
      const {data} = await axios.get('http://localhost:5000/api/data/category',{
        withCredentials:true
      });
      setCategories([...data.filter((data)=>data.type === type )]);
    }
    const loadAccount = async () => {
      const {data} = await axios.get('http://localhost:5000/api/data/accounts',{
        withCredentials:true,
      });
      setAccounts([...data]);
    }
    if(data) setEditData(data);
    loadCategory();
    loadAccount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, type: type });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(data){
        const {status} = await axios.put(`http://localhost:5000/api/data/transaction/${data._id}`, formData , {
          withCredentials:true
        });
        if(status===200) {setType(null); onClose();};
      }

      if(type ==='income' && !data){
        const {data, status} = await axios.post('http://localhost:5000/api/data/income',formData,{
          withCredentials:true
        });
        if(status===200) {setType(null); onClose();};
      }

      if(type==='expense' && !data){
        const {data,status} = await axios.post('http://localhost:5000/api/data/expense',formData,{
          withCredentials:true
        });
        if(status===200) {setType(null); onClose();};
      }
 
    } catch(error){
      console.log(error);
    }
  };


  return (
    <div id="createCredit" className="fixed  inset-0 z-20 bg-gray-500 bg-opacity-50">
        <div className="max-w-lg mx-auto mt-10 relative  bg-white p-6 shadow rounded-lg">
        <button onClick={() => { setType(null); onClose(); }} className='absolute text-xl top-4 right-6'><RxCross2/></button>
          <h2 className="text-xl font-bold mb-4">{!data?`Add ${type}`:`edit ${type}`}</h2>
          <form onSubmit={handleSubmit}>
            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                required
                name="category"
                value={formData.category}
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
            {/* Value */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="value">
                Value
              </label>
              <input
                required
                type="number"
                id="value"
                name="value"
                value={formData.value}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                placeholder="Enter amount"
              />
            </div>
            {/* Account */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="account">
                Account
              </label>
              <select
              required
                id="account"
                name="account"
                value={formData.account}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              >
                <option value="">Select Account</option>
                {accounts.map((acc, index) => (
                  <option key={index} value={acc.accountName}>
                    {acc.accountName}
                  </option>
                ))}
              </select>
            </div>
            {/* Date */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="date">
                Date
              </label>
              <input
              required
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              />
            </div>
            {/* Time */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="time">
                Time
              </label>
              <input
              required
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              />
            </div>
            {/* Notes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                placeholder="Additional details..."
              ></textarea>
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
              >
                {`Add ${type}`}
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default CreditForm;
