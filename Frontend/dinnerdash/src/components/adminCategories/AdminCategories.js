import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../api/getCategories";

export const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <label htmlFor="category">Select a category:</label>
        <select id="category">
          {categories.map((category) => (
            <option key={category._id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
