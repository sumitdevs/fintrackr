import React, { useState, useEffect} from 'react';
import DebtCard from '../../../cards/DebtCard';
import DebtForm from '../../../forms/DebtForm';
import axios from 'axios';
import DeleteCard from '../../../cards/DeleteCard';

function Debt() {
    const [form, setForm] = useState(null);
    const [debts, setDebts] = useState([]);
    const [edit, setEdit] = useState(null);
    const [del, setDel] = useState(null);

    useEffect(()=>{
      const loadDebt = async ()=>{
        try{
          const {data} = await axios.get('http://localhost:5000/api/data/debts', {
            withCredentials:true,
          });
          setDebts(data);
        } catch(error){
          console.log(error);
        }
      }
      loadDebt();
    }, [form, edit, del]);
    const handleDelete = async ()=>{
      try{
        const {status} = await axios.delete(`http://localhost:5000/api/data/debts/${del._id}`);
        if(status===200) setDel(null);
      } catch(error){
        console.log(error);
      }
  }
  return (
    <div className='bg-gray-500 bg-opacity-10 py-10 '>
          {
            form && <DebtForm type={form} onClose={setForm} />
          }
          {
            edit && <DebtForm type={form} data={edit} onClose={setEdit} />
          }
          {
            del && <DeleteCard account={del} type={del.type} onCancel={()=>setDel(null)} onConfirm={()=>handleDelete()} />
          }
        <div className='max-w-6xl mx-auto'>
            <div className='flex items-center justify-center gap-x-10'>
                <button onClick={()=>setForm('credit')} className='bg-clr_accent_200  text-white rounded-md py-2 px-10'>Credit</button>
                <button onClick={()=>setForm('debt')} className='bg-red-500  text-white rounded-md py-2 px-10'>Debt</button>
            </div>
            <div>
               {
                debts.map((data)=>
                <DebtCard data = {data} onEdit = {()=>setEdit(data)} onDel = {()=>setDel(data)} />
                )
               }
            </div>
        </div>
    </div>
  )
}

export default Debt