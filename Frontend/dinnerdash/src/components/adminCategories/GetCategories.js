import React, { useEffect, useState } from "react";
import {
  deleteCategory,
  fetchCategories,
  updateCategoryTitle,
} from "../../api/getCategories";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../../api/auth";

export const GetCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleDelete = async (categoryId) => {
    try {
      const token = getToken();
      await deleteCategory(categoryId, token);
      const data = await fetchCategories(token);
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (categoryId, currentTitle) => {
    setEditingCategoryId(categoryId);
    setEditedTitle(currentTitle);
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditedTitle("");
  };

  const handleUpdate = async (categoryId) => {
    const trimmedTitle = editedTitle.trim().toLowerCase();
    if (trimmedTitle === "") {
      console.error("Category title is empty");
      const notify = () => toast.error("Category title is empty");
      notify();
      return;
    }
    if (
      trimmedTitle ===
      categories
        .find((category) => category._id === categoryId)
        .title.toLowerCase()
    ) {
      setEditingCategoryId(null);
      setEditedTitle("");
      return;
    }
    try {
      const token = getToken();
      await updateCategoryTitle(categoryId, trimmedTitle, token);
      const data = await fetchCategories(token);
      setCategories(data);
      setEditingCategoryId(null);
      setEditedTitle("");
    } catch (error) {
      const notify = () => toast.error(error.message);
      notify();
      console.error(error);
    }
  };

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
      <ToastContainer />
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  {editingCategoryId === category._id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    category.title
                  )}
                </td>
                <td>
                  {editingCategoryId === category._id ? (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdate(category._id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(category._id, category.title)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(category._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
