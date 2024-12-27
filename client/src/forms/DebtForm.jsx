import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';


const DebtForm = ({onClose, type, data}) => {
  const [formData, setFormData] = useState({
    value: '',
    account: '',
    date: '',
    paybackDate: '',
    personName: '',
    notes: '',
    frequency:'default',
    type:type
  });
  const [accounts, setAccounts] = useState([]);

  useEffect(()=>{
    const loadAccount = async () => {
      const {data} = await axios.get('http://localhost:5000/api/data/accounts',{
        withCredentials:true,
      });
      setAccounts([...data]);
    }
    if(data) setFormData({...data, date: data.date.split('T')[0], paybackDate: data.paybackDate.split('T')[0] });
    loadAccount();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
     if(data){
      const {status} = await axios.put(`http://localhost:5000/api/data/debts/${data._id}`, formData, {
        withCredentials:true,
      });
      onClose(null);  
     } else{
      const {status} = await axios.post('http://localhost:5000/api/data/debts', formData, {
        withCredentials:true,
      });
      onClose(null);  
     }
    } catch(error) {
      console.log(error);
    }
  };


  return (
    <div className='fixed inset-0 z-20 bg-gray-500 bg-opacity-20'>
      <div className="max-w-md mx-auto mt-4 relative bg-white shadow-md rounded-lg p-6">
        <button onClick={()=>onClose(null)} className='absolute text-xl top-4 right-6'><RxCross2/></button>
        <h2 className="text-lg font-semibold mb-4">New {type}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Value</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Enter value"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Account</label>
            <select
              name="account"
              value={formData.account}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select an account
              </option>
              {accounts.map((account, index) => (
                <option key={index} value={account.accountName}>
                  {account.accountName}
                </option>
              ))}
            </select>
          </div>
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Payback Date */}
          <div>
        <label className="block text-sm  font-medium text-gray-700">Payback Date</label>
        <div className="flex text-sm select-none  text-clr_accent_200 items-center gap-x-2 my-2">
        <label className="flex items-center gap-x-1 cursor-pointer">
          <input
            type="radio"
            name="frequency"
            value="default"
            onChange={handleChange}
            className="form-radio text-blue-600"
            checked={formData.frequency === 'default'}
            />
          <span>Default</span>
        </label>
        <label className="flex items-center gap-x-1 cursor-pointer">
          <input
            type="radio"
            name="frequency"
            value="weekly"
            checked={formData.frequency === 'weekly'}
            onChange={handleChange}
            className="form-radio text-blue-600"
          />
          <span>Weekly</span>
        </label>

        {/* Radio Button - Monthly */}
        <label className="flex items-center gap-x-1 cursor-pointer">
          <input
            type="radio"
            name="frequency"
            value="monthly"
            checked={formData.frequency === 'monthly'}
            onChange={handleChange}
            className="form-radio text-blue-600"
          />
          <span>Monthly</span>
        </label>
          </div>
            <input
              type="date"
              name="paybackDate"
              value={formData.paybackDate}
              onChange={handleChange}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Person Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Person Name</label>
            <input
              type="text"
              name="personName"
              value={formData.personName}
              onChange={handleChange}
              placeholder="Enter person's name"
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DebtForm;
