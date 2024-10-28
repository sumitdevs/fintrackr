import React from 'react';

const Footer = ()=>{
    return(
        <footer>
            <div className='max-w-7xl mx-auto text-center py-4'>
                <p>&copy; fintrackr {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}

export default Footer;