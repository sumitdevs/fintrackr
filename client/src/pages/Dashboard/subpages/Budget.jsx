import React, {useState, useEffect} from 'react';
import BudgetProgress from '../../../components/BudgetProgress';
import { IoFilter } from "react-icons/io5";
import BudgetForm from '../../../forms/BudgetForm';
import DeleteCard from '../../../cards/DeleteCard';
import axios from 'axios';


function Budget() {
  const [form, setForm] = useState(false);
  const [budget, setBudget] = useState([]);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);
  useEffect(()=>{
    const loadBudget = async ()=>{
      try{
        const {data} = await axios.get(`http://localhost:5000/api/data/budget/`,{
          withCredentials:true,
      });
      setBudget(data);
      }catch(error){
        console.log(error);
      }
    }
    loadBudget();
  }, [form,edit,del])
  
  const handleDelete = async ()=>{
    try{
      const {status} = await axios.delete(`http://localhost:5000/api/data/budget/${del._id}`);
      if(status === 200) setDel(null);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='bg-clr_primary_300  bg-opacity-10 py-10 '>
        <div className='max-w-6xl relative pt-2 pb-10 mx-auto'>
          {
            form &&  <BudgetForm setForm={()=>setForm(false)} />
          }
          {
            edit && <BudgetForm data={edit} setForm={()=>setEdit(null)} />
          }
          {
            del && <DeleteCard account={del} type='budget' onConfirm={()=>handleDelete()} onCancel={()=>{setDel(null)}} />
          }
        <div className='flex  items-center justify-between py-2 mb-4  bg-white rounded-lg px-2'>
        <button onClick={()=>setForm(true)} className='flex bg-white px-2 h-fit items-center text text-base font-semibold gap-x-2  border rounded-xl '><span>Add +</span></button>
        <button className='flex bg-white px-2 h-fit items-center text-sm gap-x-2  border rounded-xl '><span>Filters</span><IoFilter/></button>    
        </div>
        <div className="h-screen scrollbar-hidden w-full overflow-auto">
          {
            [...budget].reverse().map((data)=>(
              <BudgetProgress key={data._id} data={data} onEdit={()=>setEdit(data)}  onDel={()=>setDel(data)} />
            ))
          }
        </div>

        </div>
    </div>
  )
}

export default Budget