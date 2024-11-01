import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const HeaderHome = () => {
    const [cookies,_, removeCookie] = useCookies([]);
    const [user, setUser] = useState('');
    const [status, setStatus] = useState(false);
    
    useEffect(()=>{
        const fetchUser = async ()=>{
            const {data} = await axios.post("http://localhost:5000", {}, {withCredentials:true});
            const {user, status} = data;
            setUser(user.split('@')[0]);
            setStatus(status);
        };

        fetchUser();
    },[status]);

    const handleLogout = () => {
        removeCookie("token", { path: "/" });
        setStatus(false);
        // navigate("/");
      };
    
    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">About Us</Link>
                    <Link to="/features" className="text-sm font-semibold leading-6 text-gray-900">Features</Link>
                    <Link to="contact" className="text-sm font-semibold leading-6 text-gray-900">Contact</Link>
                </div>
                <div className={(status?'lg:hidden ':'lg:flex ') + 'hidden gap-x-12 lg:flex-1 lg:justify-end'}>
                    <Link to="/register" className="text-sm font-semibold leading-6 text-gray-900">Register</Link>
                    <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">Log in <span aria-hidden="true">&rarr;</span></Link>
                </div>

                <div className={ (status?'lg:flex ':'lg:hidden ') + 'hidden gap-x-12  lg:flex-1 lg:justify-end'}>
                   <p>{user}</p>
                   <button onClick={handleLogout}>Logout</button>
                </div>
               
            </nav>
        </header>

    )
}

export default HeaderHome;