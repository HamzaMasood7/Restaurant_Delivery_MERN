import React, { useState } from "react";
import { createCategory } from "../../api/getCategories";
import { getToken } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";

export const CreateCategory = () => {
  const [categoryTitle, setCategoryTitle] = useState("");

  const handleCreateCategory = async (event) => {
    event.preventDefault();
    const trimmedTitle = categoryTitle.trim().toLowerCase();
    if (trimmedTitle === "") {
      console.error("Category title is empty");
      const notify = () => toast.error("Category title is empty");
      notify();
      return;
    }

    try {
      const categoryData = {
        title: trimmedTitle,
      };
      const token = getToken();
      await createCategory(categoryData, token);
      const notify = () => toast.success("Category Created");
      notify();

      setCategoryTitle("");
    } catch (error) {
      const notify = () => toast.error(error.message);
      notify();
      console.error(error);
    }
  };

  const handleTitleChange = (event) => {
    setCategoryTitle(event.target.value);
  };

  return (
    <div>
      <ToastContainer />
      <form>
        <label className="h3">Create Category: </label>
        <input
          className="form-control"
          type="text"
          id="form"
          required
          value={categoryTitle}
          onChange={handleTitleChange}
          placeholder="Enter category title"
        />
        <button onClick={handleCreateCategory} className="btn btn-dark mt-3">
          Create Category
        </button>
      </form>
    </div>
  );
};
