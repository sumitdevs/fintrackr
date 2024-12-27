import React, { useState, useEffect} from "react";
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

const CreditCardForm = ({setForm, data}) => {
  const [formData, setFormData] = useState({
    name: "",
    account: "",
    limit: "",
    interestRate: "",
    billingCycleStart: "",
    billingCycleEnd: "",
  });

  const [accounts, setAccounts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(data) {
        const {status} = await axios.put(`http://localhost:5000/api/data/credit/${data._id}`,formData, {
          withCredentials:true
        });
        if(status===200) setForm(null);
      } else {
        const {status} = await axios.post('http://localhost:5000/api/data/credit', formData, {
          withCredentials:true
        });
        if(status===200) setForm(false);
      }
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    const loadAccount = async () => {
      const {data} = await axios.get('http://localhost:5000/api/data/accounts',{
        withCredentials:true,
      });
      setAccounts([...data]);
    }
    loadAccount();
    if(data) setFormData({...data});
  }, []);


  return (
    <div id='creditcardform' className='  fixed z-20  bg-gray-500 bg-opacity-10 inset-0'>
      <div className="max-w-lg mx-auto mt-20 relative bg-white p-6 rounded-lg shadow-md">
        <button onClick={setForm} className='absolute text-xl top-4 right-6'><RxCross2/></button>
        <h2 className="text-xl font-bold mb-4">{data?'Edit':"Add"} credit Card</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cardholder Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter cardholder name"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          {/* Associated Account */}
          <div>
            <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">
              Associate Account
            </label>
            <select
              id="account"
              name="account"
              value={formData.account}
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
          {/* Limit */}
          <div>
            <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">
              Credit Limit (₹)
            </label>
            <input
              type="number"
              id="limit"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              placeholder="Enter credit limit"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          {/* Interest Rate */}
          <div>
            <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              placeholder="Enter interest rate"
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          {/* Starting Date */}
          <div>
            <label htmlFor="billingCycleStart" className="block text-sm font-medium text-gray-700 mb-1">
              Starting Date
            </label>
            <input
              type="date"
              id="billingCycleStart"
              name="billingCycleStart"
              value={formData.billingCycleStart.split('T')[0]}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          {/* Payment Date */}
          <div>
            <label htmlFor="billingCycleEnd" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Date
            </label>
            <input
              type="date"
              id="billingCycleEnd"
              name="billingCycleEnd"
              value={formData.billingCycleEnd.split('T')[0]}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              {data?'Edit':"Add"} Credit Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
