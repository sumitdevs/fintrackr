import {React, useState} from 'react';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const Login = ()=>{
    const [formData, setFormData] = useState({email:'', password:''});
    const handleFormData = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };
    const[error, setError] = useState('');
    const [color, setColor] = useState('')
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/auth/login', formData);
            if(response.status>200){
                setColor('text-red-500');
            } else{
                navigate('/dashboard');
            }
            setError(response.data.message);
        } catch (err) {
            console.log(err);
        }
        setFormData({email:'', password:''});
    }
    return(
        <div className="mx-auto max-w-7xl h-screen">
        <div className='w-full  mx-auto lg:w-1/3 md:w-1/2 flex flex-col justify-center items-center gap-6 p-10 bg-white rounded-md'>
            <h2 className='text-4xl font-semibold'>Login</h2>
            <p className={color}>{error}</p>
            <form onSubmit={handleSubmit} action="" className='w-full flex flex-col gap-4'>
                <input onChange={handleFormData} className='border outline-none px-4 py-2' placeholder='Email' type="email" name="email" id="email" value={formData.email} required />
                <input onChange={handleFormData} className='border outline-none px-4 py-2' placeholder='Psassword' type="password" name="password" value={formData.password} id="pass" required />
                <a className='mx-auto text-blue-500 font-medium' href="#">Forget password?</a>
                <button className='bg-blue-600 py-2 rounded-sm text-white' type="submit">Login</button>
                <p className=' self-center'>Don't have an account?<a className='text-blue-600' href="#">Signup</a></p>
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

export default Login;