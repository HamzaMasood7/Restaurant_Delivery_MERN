import React, { useState, useEffect } from "react";
import { fetchItems } from "../../api/Items";
import { getToken } from "../../api/auth";

export const GetItems = () => {
  const [items, setitems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();

        if (token) {
          const data = await fetchItems(token);
          setitems(data);
        }
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
          {items.map((category) => (
            <option key={category._id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
