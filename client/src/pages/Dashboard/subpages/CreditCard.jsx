import React, {useEffect, useState} from 'react';
import CreditProgress from '../../../cards/CreditProgress';
import CreditCardForm from '../../../forms/CreditCardForm';
import axios from 'axios';
import DeleteCard from '../../../cards/DeleteCard';

function CreditCard() {
  const [form, setForm] = useState(false);
  const [credit, setCredit] = useState([]);
  const [edit, setEdit] = useState(null);
  const [del, setDel] = useState(null);

  const handleDelete = async ()=>{
      try{
        const {status} = await axios.delete(`http://localhost:5000/api/data/credit/${del._id}`);
        if(status===200) setDel(null);
      } catch(error){
        console.log(error);
      }
  }

  useEffect(()=>{
    const loadCredit = async ()=>{
     try{
      const {data} = await axios.get('http://localhost:5000/api/data/credit',{
        withCredentials:true,
      });
      setCredit(data);
     } catch(error){
      console.log(error);
     }
    }
    loadCredit();
  }, [form, edit, del]);
  return (
    <div className=' bg-gray-500 bg-opacity-10'>
          {
            form && <CreditCardForm setForm={()=>setForm(false)} />
          }
          {
            del && <DeleteCard account={del} type="creditcard" onConfirm= {()=>handleDelete()} onCancel={()=>setDel(null)} />
          }
          {
            edit && <CreditCardForm data = {edit} setForm={()=>setEdit(null)} />
          }
        <div className='max-w-6xl flex flex-col gap-y-2 mx-auto py-10'>
            <div>
            <button onClick={()=>{setForm(true)}} className='bg-clr_accent_200 mx-auto block text-white rounded-md py-2 px-10'>Add</button>
            </div>
            <div className='h-10 mb-10 px-1 flex items-center rounded-lg bg-white '>
                <p>Amount Due : &#8377;500</p>
            </div>
            {
              credit.map((data)=><CreditProgress onEdit={()=>setEdit(data)} onDel ={()=>{setDel(data)}} key={data._id} data={data} />)
            }
        </div>
    </div>
  )
}

export default CreditCard