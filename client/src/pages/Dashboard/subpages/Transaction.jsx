import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TotalBalance from '../../../cards/TotalBalance'
import { IoFilter } from "react-icons/io5";
import { IoMdDownload } from "react-icons/io";
import TransactionCard from '../../../cards/TransactionCard';
import CreditForm from '../../../forms/CreditForm';
import FilterForm from '../../../forms/FilterFom';
import DeleteCard from '../../../cards/DeleteCard';

function Transaction() {
  const [transaction, setTransaction] = useState([]);
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [type, setType] = useState(null);
  const [edit,setEdit] = useState(null);
  const [del, setDel] = useState(null);

  const showLabel = ()=>{
    const form = document.getElementById('filter');
    form.classList.toggle('hidden');
  }

  useEffect(()=>{

    const loadTransaction = async ()=>{
      try{
        const {data} = await axios.get('http://localhost:5000/api/data/transaction', {
          withCredentials:true
        });
        setTransaction([...data]);
      } catch(error){
        console.log(error);
      }
    }

    const loadIncome = async ()=>{
        try{
          const {data} = await axios.get('http://localhost:5000/api/data/income', {
            withCredentials:true
          });
          setIncome([...data]);
        } catch(error){
          console.log(error);
        }
    }
    const loadExpense = async ()=>{
      try{
        const {data} = await axios.get('http://localhost:5000/api/data/expense',{
          withCredentials:true
        });
        setExpense([...data]);
      }catch(error){
        console.log(error);
      }
    }
    loadTransaction(); 
    loadIncome();
    loadExpense();
  }, [type, edit, del]);

  const handleDelete = async ()=>{
    try{
      const {status} = await axios.delete(`http://localhost:5000/api/data/transaction/${del._id}`);
      if(status ===200) setDel(null);
    }catch(error){
      console.log(error);
    }
  }


  return (
    <div className='w-full bg-clr_primary_200 bg-opacity-10'>
         {
          type ==='income' && !edit && <CreditForm type={type} setType={(value)=>setType(value)} />
         }
         {
          type ==='expense' && !edit && <CreditForm type={type} setType={setType} />
         }
         {
          edit && <CreditForm type={type} setType={(value)=>setType(value)}  data={edit} onClose={()=>setEdit(null)} />
         }
         {
          del && <DeleteCard type="transaction" account={del} onConfirm={()=>handleDelete()} onCancel={()=>setDel(null)} />
         }
        
        <div className='max-w-6xl flex flex-col  mx-auto py-10'>
        <div className='w-full bg-white border px-10 py-4 flex items-center'>
            <div className=''>
              <div className='w-full'>
                  {/* <TotalBalance data={Account}/> */}
              </div>
            </div>
            <div className='flex-1 justify-end flex'>
              <p className='text-6xl'>&#8377; 10000</p>
            </div>
        </div>
        <div className='flex-1 mt-10 mb-4'>
            <div className='flex text-white w-fit gap-x-10 mx-auto'>
                <button onClick={()=> setType('income')} className='py-2 px-8 rounded-lg bg-clr_accent_200'>Income</button>
                <button onClick={()=>setType('expense')} className='py-2 px-8 rounded-lg bg-red-500'>Expense</button>
            </div>
        </div>
            <div className='flex-1 relative w-full  bg-white'>
                <div className='flex justify-between px-1 py-3  border'>
                    <button onClick={showLabel} className='flex px-2 h-fit items-center text-sm gap-x-2  border rounded-xl '><span>Filters</span><IoFilter/></button>
                    <button className='flex px-2 rounded-xl h-fit items-center text-sm gap-x-2 border'><span>Statement</span><IoMdDownload/></button>
                </div>
                <div className='absolute z-20 inset-0  top-10'>
                 <FilterForm/>
                </div>
            </div>
            <div className='relative h-64 scrollbar-hidden py-10 overflow-auto'>
              {
                transaction && [...transaction].reverse().map((data)=><TransactionCard onDel={()=>{setDel(data)}}  onEdit={()=>{setEdit(data); setType(data.type); console.log(data)}} key={data._id} data={data}/>)
              }
        </div>
        </div>
    </div>
  )
}

export default Transaction