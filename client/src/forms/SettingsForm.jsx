import React, { useState, useEffect} from "react";
import axios from 'axios';

const SettingsForm = () => {

  const [settings, setSettings] = useState({
    username: "",
    email: "",
    firstDayOfMonth: 1,
    firstDayOfWeek: "monday",
  });
  
  const [user, setUser] = useState(null);
  const [dataStatus, setDataStatus] = useState(false);
  const [generalSetting, setGeneralSetting] = useState(null);
  const [btnUser, setBtnUser] = useState(false);
  const [btnEmail, setBtnEmail] = useState(false);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e, field) => {
    e.preventDefault();
    if(field === 'username'){
        try{
          const {status} = await axios.put(`http://localhost:5000/api/data/user/${user._id}`, {userName:settings.username}, {withCredentials:true});
          if(status === 200) setBtnUser(false)
        } catch(error) {
          console.log(error);
        }
    }
    if(field === 'email'){
      try{
        const {status} = await axios.put(`http://localhost:5000/api/data/user/${user._id}`, {email:settings.email}, {withCredentials:true});
        if(status === 200) setBtnEmail(false)
      } catch(error) {
        console.log(error);
      }    }

    if(field === 'general'){
      try{
        const {status} = await axios.put(`http://localhost:5000/api/data/setting/${generalSetting._id}`, settings, {withCredentials:true});
      } catch(error) {
        console.log(error);
      } 
    }
    
  };

  const defaultSettings = async ()=>{
    try{
      const {data} = await axios.post('http://localhost:5000/api/data/setting',settings, {withCredentials:true});
      setGeneralSetting(data[0]);
      setDataStatus(true);
    } catch(error){
      console.log(error);
    }
  }
  const handleSettings = async ()=>{
    try{
      const {data} = await axios.get('http://localhost:5000/api/data/setting', {withCredentials:true});
      if(data.length>0){
        setGeneralSetting(data[0]);
        setDataStatus(true);
      } else{
        defaultSettings();
      }
    } catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    const loadUser = async ()=>{
      try{
        const {data} = await axios.get('http://localhost:5000/api/data/user', {withCredentials:true});
        setSettings({ ...settings, username:data.userName, email:data.email,firstDayOfMonth:generalSetting.firstDayOfMonth, firstDayOfWeek:generalSetting.firstDayOfWeek});
        setUser(data);
      } catch(error){
        console.log(error);
      }
    }
    handleSettings();
    loadUser();
  },[dataStatus]);

  return (
    <div className="p-6  bg-white shadow-md rounded-lg">
      {/* Account Settings Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Account Settings
        </h2>
        <div className="space-y-4">
          <form
            onSubmit={(e) => handleSubmit(e, "username")}
            className="w-1/2 flex items-center gap-x-4"
          >
            <label className="text-sm w-32 font-medium text-gray-600 mb-1">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={settings.username}
              onChange={(e) => { handleInputChange(e); setBtnUser(true); }}
              placeholder="Enter username"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button className={btnUser?'cursor-pointer text-blue-500':'cursor-text'} type="submit"         disabled={!btnUser}
            >save</button>
          </form>
          {/* Email */}
          <form
            onSubmit={(e) => handleSubmit(e, "email")}
            className="w-1/2 flex items-center gap-x-4 "
          >
            <label className="block w-32 text-sm font-medium text-gray-600 mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={settings.email}
              onChange={(e) => { handleInputChange(e); setBtnEmail(true); }}
              placeholder="Enter email"
              className="w-full px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button className={btnEmail?'cursor-pointer text-blue-500':'cursor-text'} type="submit"         disabled={!btnEmail}
            >save</button>
          </form>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-gray-300 my-6" />

      {/* General Settings Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          General Settings
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e, "general")}
          className="space-y-4 w-1/2"
        >
          {/* First Day of Month */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Day of Month (1-28)
            </label>
            <input
              type="number"
              name="firstDayOfMonth"
              value={settings.firstDayOfMonth}
              onChange={handleInputChange}
              min={1}
              max={28}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          {/* First Day of Week */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Day of Week
            </label>
            <select
              name="firstDayOfWeek"
              value={settings.firstDayOfWeek}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-32 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsForm;
