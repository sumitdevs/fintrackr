import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

const CreateAccount = ({setStatus, setForm, value, edit}) => {
  const [formData, setFormData] = useState({
    accountName: '',
    value: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const closeForm = ()=>{
    setForm(false);
    // const form = document.getElementById('createAccount');
    // form.classList.toggle('hidden');
  }
  
  useEffect(()=>{
    edit && setFormData({
      accountName: edit.accountName,
      value: edit.balance,
      notes: edit.accountDesc,
    })
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(value ==='add'){
        const {status} =  await axios.post('http://localhost:5000/api/data/accounts', formData, {
          withCredentials:true,
        });
        if (status === 200) {
          setStatus();
          closeForm();
          setFormData({
            accountName: '',
            value: '',
            notes: '',
          });    
        }
      } else{
        const {status} =  await axios.put(`http://localhost:5000/api/data/accounts/${edit._id}`, formData, {
          withCredentials:true,
        });
        if (status === 200) {
          setStatus();
          closeForm();
          setFormData({
            accountName: '',
            value: '',
            notes: '',
          });    
        }
      }
 
    }catch(error){
      console.log(error);
    }
  };

  return (
    <div  id='createAccount' className="w-full  fixed z-20 inset-0 bg-gray-600 bg-opacity-40">
        <div className="max-w-md mx-auto relative  w-full mt-10 p-6 bg-white shadow-md py-10 rounded-md">
          <button onClick={closeForm} className='absolute text-xl top-4 right-6'><RxCross2/></button>
          <h2 className="text-2xl font-bold text-center capitalize mb-6">{value} Account</h2>
          <form  onSubmit={handleSubmit} className="space-y-4">
            {/* Account Name */}
            <div>
              <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">
                Account Name
              </label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                value={formData.accountName}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter account name"
              />
            </div>
            {/* Value */}
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                Value
              </label>
              <input
                type="number"
                id="value"
                name="value"
                value={formData.value}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter value"
              />
            </div>
            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Add additional notes"
              />
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
    </div>
  );
};

export default CreateAccount;
