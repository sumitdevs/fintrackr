import React, { useState } from "react";

const FilterForm = () => {
  const [filters, setFilters] = useState({
    month: "",
    category: "",
    type: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const categories = ["Food", "Travel", "Shopping", "Health", "Rent", "Utilities"];
  const types = ["Income", "Expense"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filters Applied:", filters);
  };

  return (
    <div id='filter' className="max-w-sm hidden  bg-white p-1 shadow rounded-lg">
      <h2 className="text-sm font-bold mb-2">Filter Transactions</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Month Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="month">
            Month
          </label>
          <select
            id="month"
            name="month"
            value={filters.month}
            onChange={handleChange}
            className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Type Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full text-sm border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
          >
            <option value="">Select Type</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full text-sm bg-indigo-500 text-white py-1 px-2 rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
