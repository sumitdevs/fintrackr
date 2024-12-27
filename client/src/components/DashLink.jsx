import React from 'react'
import { Link } from "react-router-dom";

const DashLink = ({navData}) => {
  return (
    <nav className="flex flex-col p-4 space-y-4">
        {
            navData.map((data,key)=>
            <Link key={key} to={data.url} className="hover:bg-gray-700 focus:bg-gray-700 gap-x-2 p-2 flex items-center rounded">
              {data.icon}
              <span>{data.name}</span>
           </Link>
            )
        }
        
        
      </nav>
  )
}

export default DashLink