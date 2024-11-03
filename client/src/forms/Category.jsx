import React, { useState } from "react";
import axios from "axios";

const Category = () => {
    const [categoryName, setCategoryName] = useState("");
    const [subCategories, setSubCategories] = useState([""]);

    // Handle changes in the category name input
    const handleCategoryChange = (e) => setCategoryName(e.target.value);

    // Handle changes in the subcategory inputs
    const handleSubCategoryChange = (index, value) => {
        const newSubCategories = [...subCategories];
        newSubCategories[index] = value;
        setSubCategories(newSubCategories);
    };

    // Add a new subcategory input
    const addSubCategory = () => setSubCategories([...subCategories, ""]);

    // Remove a subcategory input
    const removeSubCategory = (index) => {
        const newSubCategories = subCategories.filter((_, i) => i !== index);
        setSubCategories(newSubCategories);
    };

    // Submit the form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { name: categoryName, subCat: subCategories.filter((name) => name) };
        
        try {
            await axios.post("/api/categories", formData);
            alert("Category submitted successfully!");
            setCategoryName("");
            setSubCategories([""]);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit category.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-4">Add Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                
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
        </div>
    );
};

export default Category;
