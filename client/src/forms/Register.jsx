import {React, useState,useEffect} from  'react';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Register = ()=>{
    const [formData, setFormData]= useState({
        email:'',
        password:'',
        confirmPassword:''
    });
    const[error, setError] = useState('');
    const [color, setColor] = useState('')

    const handleFormData = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(formData.password !== formData.confirmPassword){
            setColor('text-red-500');
            setError('Error! Confirm Password Not Match');
            setFormData({
                ...formData,
                confirmPassword:''
            });
            return
        }
        try {
            const response = await axios.post('http://localhost:5000/auth/register', formData);
            // console.log(response.status);
            if(response.status>200) setColor('text-red-500')
            else setColor('text-green-500');
            setError(response.data.message);
          } catch (error) {
            console.log('Error submitting form:', error); // Handle error (e.g., show an error message)
          }
          setFormData({
            email:'',
            password:'',
            confirmPassword:''
        });
    };
    

    return(
            <div className="mx-auto max-w-7xl h-screen">
                <div className='w-full mx-auto md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center gap-6 p-10 bg-white rounded-md'>
                    <h2 className='text-4xl font-semibold'>Signup</h2>
                    <p className={color}>{error}</p>
                    <form onSubmit={handleSubmit} action="" className='w-full flex flex-col gap-4'>
                        <input onChange={handleFormData} className='border outline-none px-4 py-2' placeholder='Email' type="email" name="email" id='email' value={formData.email} required />
                        <input onChange={handleFormData} className='border outline-none px-4 py-2' placeholder='Create password' type="password" value={formData.password} name="password" id="password" required />
                        <input onChange={handleFormData} className='border outline-none px-4 py-2' placeholder='Confirm password' type="password" value={formData.confirmPassword} name="confirmPassword" id="confirmPassword" required />
                        <button className='bg-blue-600 py-2 rounded-sm text-white' type="submit">Signup</button>
                        <p className=' self-center'>Already have an account?<a className='text-blue-600' href="#">Login</a></p>
                        <div className='flex items-center gap-2 text-gray-400'>
                        <hr className='w-full
                        ' />
                        <span>OR</span>
                        <hr className='w-full' />
                        </div>
                    </form>
                    <button className="relative w-full flex items-center bg-white border px-6 py-2">
                        <span className="absolute left-4 text-2xl">
                        <FcGoogle />
                        </span>
                        <span className="mx-auto">Login with Google</span>
                    </button>
                    </div>
            </div>
    )
}

export default Register;