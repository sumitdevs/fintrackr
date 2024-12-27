import React, {useEffect, useState} from 'react';
import TotalBalance from '../../../cards/TotalBalance';
import SingleAccount from '../../../cards/SingleAccount';
import CreateAccount from '../../../forms/CreateAccount';
import DeleteCard from '../../../cards/DeleteCard';
import axios from 'axios';

function Account() {
  const [userAccounts, setUserAccounts] = useState([]);
  const [status, setStatus] = useState(false);
  const [del, setDel] = useState(null);
  const [edit, setEdit] = useState(null);
  const [add, setAdd] = useState(false);
  const [form, setForm] = useState(true);

  const [balance, setBalance] = useState(null);
  
  const handleUpdate =   async ()=>{
    const balance = userAccounts.reduce((acc, account) => acc + account.balance, 0);
    setBalance(balance);
    setStatus((prev)=>(!prev));
  }

  
  const handleDelete = async (id) =>{
    try{
      const response = await axios.delete(`http://localhost:5000/api/data/accounts/${id}`);
      console.log(response.data);
      setDel(null);
    }catch(error){
      console.log(error);
    }
  }


  useEffect(()=>{
      const loadAccount = async ()=>{
        try{
          const {data} = await axios.get('http://localhost:5000/api/data/accounts',{
            withCredentials:true,
          });
          setUserAccounts(data);
          await handleUpdate();
        } catch(error){
          console.log(error);
        }
      }
      loadAccount();
      
  }, [status,del]);
  return (
    <div className='bg-clr_primary_200 bg-opacity-5 py-10'>
      {add && form && (<CreateAccount setForm={setForm} edit={edit} value={"add"} setStatus = {()=>(setStatus((prev)=>!prev))}/>)}
      {edit && form && (<CreateAccount setForm={setForm} edit={edit} value={"edit"} setStatus = {()=>(setStatus((prev)=>!prev))}/>)}
      <div className='flex flex-col gap-y-4 w-full items-center max-w-6xl  mx-auto'>
          <div className='w-full bg-white border px-10 py-4 flex items-center'>
            <div className=''>
              <div className='w-full'>
                  <TotalBalance data = {userAccounts} />
              </div>
            </div>
            <div className='flex-1 justify-end flex'>
              <p className='text-6xl'>&#8377; {balance}</p>
            </div>
          </div>
          <div className='w-full'>
            <button onClick={()=>{
              setForm(true);
              setAdd(true);
              setEdit(null);
            }} className='bg-clr_accent_200 mx-auto block text-white rounded-md py-2 px-10'>Add</button>
          </div>
          {
            userAccounts.map((data,key)=> <SingleAccount onEdit={()=>{setAdd(false); setForm(true); setEdit(data); }} onDel={()=>setDel(data)}  key={key} data={data} />
            )
          }          
      </div>
      {
        del && (
          <DeleteCard type={"account"} account={del} onConfirm={()=>(handleDelete(del._id))}  onCancel={() => setDel(null)} />
        )
      }
    </div>
  )
}

export default Account