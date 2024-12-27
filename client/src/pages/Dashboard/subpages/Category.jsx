import React, { useState, useEffect } from "react";
import CategoryForm from "../../../forms/CategoryForm";
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import DeleteCard from "../../../cards/DeleteCard";
const Category = () => {
  // Sample categories
  // const categori = [
  //   {
  //     type: "Income",
  //     primary: "Salary",
  //     secondary: ["Monthly Salary", "Bonus", "Overtime"],
  //   },
  //   {
  //     type: "Income",
  //     primary: "Investment",
  //     secondary: ["Stocks", "Dividends", "Real Estate"],
  //   },
  //   {
  //     type: "Expense",
  //     primary: "Food",
  //     secondary: ["Groceries", "Dining Out", "Snacks"],
  //   },
  //   {
  //     type: "Expense",
  //     primary: "Transport",
  //     secondary: ["Fuel", "Public Transport", "Taxi"],
  //   },
  // ];

  const [filter, setFilter] = useState("All");
  const [status, setStatus] = useState(false);
  const [selectedPrimary, setSelectedPrimary] = useState([]);
  const [categories, setCategories] = useState([]);
  const [del, setDel] = useState(null);
  const [edit, setEdit] = useState(null);

  const handleDelete = async (id)=>{
      try{
        const {data} = await axios.delete(`http://localhost:5000/api/data/category/${id}`);
        console.log(data.message);
      }catch(error) {
        console.log(error);
      }
  }

  useEffect(()=>{
      const loadCategory = async ()=>{
        try{
          const {data} = await axios.get('http://localhost:5000/api/data/category', {
            withCredentials:true,
          }
          );
          setCategories(data);
        }catch(error){
          console.log(error);
        }
      }
      loadCategory();
  }, [status,del,edit]);

  // Filtered categories based on type
  const filteredCategories =
    filter === "All"
      ? categories
      : categories.filter((category) => category.type === filter);

  const handlePrimaryClick = (primary) => {
    setSelectedPrimary(primary === selectedPrimary ? null : primary);
  };

  return (
    <div className="bg-gray-500 bg-opacity-10 h-screen">
      {
        del && (
          <DeleteCard type={'category'} account={del} onConfirm={()=>{handleDelete(del._id);setDel(null);}} onCancel={()=>setDel(null)} />
        )
      }
      {
        edit && (
          <div className="fixed inset-0 z-20 bg-gray-500 bg-opacity-10">
            <div className="w-1/2 mx-auto">
             <CategoryForm edit={edit} setEdit={setEdit} setStatus={()=>{}} />
            </div>
          </div>
        )
      }
        <div className="max-w-6xl  mx-auto py-10">
            <div className=" bg-white shadow-md rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              {/* Filter Buttons */}
              <div className="flex items-center mb-6 justify-between ">
                  <div className="flex space-x-4 ">
                    {["All", "income", "expense"].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setFilter(option);
                          setSelectedPrimary(null);
                        }}
                        className={`px-4 py-1 rounded-lg ${
                          filter === option
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        } hover:bg-blue-400 hover:text-white`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                     <button onClick={() => {setFilter("new"); setSelectedPrimary(null);}} className={`px-4 py-1  rounded-lg  ${filter === "new" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-blue-400 hover:text-white`}>+ New Category</button>
              </div>
              {/* Category List */}
              <div className="space-y-4">
                {filteredCategories.map((category, index) => (
                  <div key={index} className="select-none ">
                    {/* Primary Category */}
                    <div className={`flex-1 flex  rounded-lg border ${
                          selectedPrimary === category.name
                            ? "bg-blue-100 border-blue-400"
                            : "bg-gray-50 border-gray-300"
                        }`}>
                      <div
                        className={`cursor-pointer px-4 py-2 flex-1`}
                        onClick={() => handlePrimaryClick(category.name)}
                      >
                        <p className="font-medium">{category.name}</p>
                      </div>
                      <div className='flex p-2 text-2xl items-center justify-end gap-x-2 '>
                              <button onClick={()=>setDel(category)} className='w-8 flex justify-center items-center bg-gray-300 aspect-square rounded-sm'><MdDelete/></button>
                              <button onClick={()=>setEdit(category)}  className='w-8 flex justify-center items-center bg-gray-300 aspect-square rounded-sm'><MdEdit/></button>
                      </div>
                    </div>
                 
                    {/* Secondary Categories */}
                    {selectedPrimary === category.name &&  (
                      <div className="pl-6 mt-2 space-y-2">
                        {category.subCat.map((sub, subIndex) => (
                          <div
                            key={subIndex}
                            className="px-3 py-1 bg-gray-200 rounded-lg text-gray-700"
                          >
                            <p>{sub}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {
                    filter ==="new" && (
                        <div>
                            <CategoryForm  setStatus={()=>setStatus((data)=>(!data))} />
                        </div>
                    )
                }
              </div>
            </div>
        </div>
    </div>
  );
};

export default Category;
