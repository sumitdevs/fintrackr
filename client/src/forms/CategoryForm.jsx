import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { RxCross2 } from "react-icons/rx";


const CategoryForm = ({setStatus, setEdit, edit}) => {
    const [categoryName, setCategoryName] = useState("");
    const [subCategories, setSubCategories] = useState([""]);
    const [type, setType] = useState(null);
    const [transaction, setTransaction] = useState(['','income', 'expense']);

    // Handle changes in the category name input
    const handleCategoryChange = (e) => setCategoryName(e.target.value);

    // Handle changes in the subcategory inputs
    const handleSubCategoryChange = (index, value) => {
        const newSubCategories = [...subCategories];
        newSubCategories[index] = value;
        setSubCategories(newSubCategories);
    };

    // Add a new subcategory input
    const addSubCategory = () => {
        setSubCategories([...subCategories, ""]);
    }

    // Remove a subcategory input
    const removeSubCategory = (index) => {
        const newSubCategories = subCategories.filter((_, i) => i !== index);
        setSubCategories(newSubCategories);
    };
    const handleError = (err) =>
        toast.error(err, {
          position: "top-center",
        });
      const handleSuccess = (msg) =>
        toast.success(msg, {
          position: "top-center",
        });

        useEffect(()=>{
            if(edit){
               setType(edit.type);
               setCategoryName(edit.name);
               setSubCategories([...edit.subCat]);
            }
        },[]);

    // Submit the form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {type:type, name: categoryName, subCat: subCategories.filter((name) => name) };
        try {
            if(edit){
                const {status, data} = await axios.put(`http://localhost:5000/api/data/category/${edit._id}`, formData, {withCredentials:true});
                if(status===200){
                //   handleSuccess(data.message);
                  setEdit(null);
                } 
            } else{
                const {status, data} = await axios.post("http://localhost:5000/api/data/category", formData,{
                    withCredentials:true,
                });
                if(status === 200){
                    handleSuccess(data.message);
                    setCategoryName("");
                    setSubCategories([""]);
                    setStatus();
                    setType(null);
                } else{
                    handleError("category already exist");
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className=" relative mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            {edit && (<button onClick={()=>setEdit(null)} className='absolute text-xl top-4 right-6'><RxCross2/></button>) }
            <h2 className="text-2xl font-bold mb-4">{edit?"Edit":"Add"} Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

            <div>
            <label htmlFor="transaction-type" className="text-lg ">Type</label>
            <select required value={type}  onChange={(e) => setType(e.target.value)} id="transaction-type" className="block w-1/3 px-4 py-2   bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                   {
                   transaction.map((data,index)=>(
                        <option key={index} value={data}>{data}</option>
                    ))
                }
            </select>
            </div>

                
                {/* Category Name Input */}
                <div>
                    <label className="block text-gray-700">Category Name</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={handleCategoryChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter category name"
                        required
                    />
                </div>
                
                {/* Subcategories Inputs */}
                <div>
                    <label className="block text-gray-700">Subcategories</label>
                    {subCategories.map((subCategory, index) => (
                        <div key={index} className="flex items-center space-x-2 mt-2">
                            <input
                                type="text"
                                value={subCategory}
                                onChange={(e) => handleSubCategoryChange(index, e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={`Subcategory ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => removeSubCategory(index)}
                                className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSubCategory}
                        className="mt-2 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                        Add Subcategory
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default CategoryForm;
