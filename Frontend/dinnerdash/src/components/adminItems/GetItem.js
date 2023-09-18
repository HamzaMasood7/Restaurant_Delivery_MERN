import React, { useEffect, useState } from "react";
import {
  fetchItems,
  updateInStock,
  updateItem,
  updateNotInStock,
  updateItemPhoto,
} from "../../api/Items";
import { getToken } from "../../api/auth";
import { ToastContainer, toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";

export const GetItem = () => {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editingPhotoItemId, setEditingPhotoItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialItemState = {
    photo: null,
  };

  const handleUpdatePhoto = async (id) => {
    if (!item.photo) {
      const notify = () => toast.error("Please select a photo");
      notify();
      return;
    }
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("photo", item.photo);

      const token = getToken();

      await updateItemPhoto(id, formData, token);
      fetchData();
      const notify = () => toast.success("updated photo");
      notify();
      setItem(initialItemState);
      setEditingPhotoItemId(null);
    } catch (error) {
      const notify = () => toast.error(error.message);
      notify();
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [item, setItem] = useState(initialItemState);
  const handleEdit = (itemId, currentDescription, currentPrice) => {
    setEditingItemId(itemId);
    setEditedDescription(currentDescription);
    setEditedPrice(currentPrice);
  };

  const handleEditPhoto = (itemId) => {
    setEditingPhotoItemId(itemId);
  };

  const handleCancelPhotoEdit = () => {
    setEditingPhotoItemId(null);
  };

  const handleRestrict = async (itemId) => {
    const token = getToken();
    try {
      await updateNotInStock(itemId, token);
      updateItemStockStatus(itemId, false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShow = async (itemId) => {
    const token = getToken();
    try {
      await updateInStock(itemId, token);
      updateItemStockStatus(itemId, true);
    } catch (err) {
      console.error(err);
    }
  };

  const updateItemStockStatus = (itemId, inStock) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id === itemId ? { ...item, inStock: inStock } : item
      )
    );
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedDescription("");
    setEditedPrice("");
  };

  const handleUpdate = async (itemId) => {
    const token = getToken();

    const trimmedDescription = editedDescription.trim();

    if (trimmedDescription === "") {
      const notify = () => toast.error("description cannot be empty");
      notify();
      return;
    }

    if (editedPrice < 1) {
      const notify = () => toast.error("price should be greater than 0");
      notify();
      return;
    }

    try {
      const updatedItem = {
        description: trimmedDescription,
        price: editedPrice,
      };

      await updateItem(itemId, updatedItem, token);

      const updatedItems = items.map((item) =>
        item._id === itemId ? { ...item, ...updatedItem } : item
      );
      setItems(updatedItems);

      setEditingItemId(null);
      setEditedDescription("");
      setEditedPrice("");
    } catch (error) {
      const notify = () => toast.error(error.message);
      notify();
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const token = getToken();

      if (token) {
        const itemData = await fetchItems(token);
        setItems(itemData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="table-responsive">
        <ToastContainer />
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>
                  {editingItemId === item._id ? (
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td>
                  {editingItemId === item._id ? (
                    <input
                      type="text"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(e.target.value)}
                    />
                  ) : (
                    item.price
                  )}
                </td>
                <td>
                  {editingPhotoItemId !== item._id ? (
                    <img
                      src={
                        item.photo
                          ? item.photo
                          : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
                      }
                      alt="item"
                      style={{ height: "100px" }}
                    />
                  ) : (
                    <>
                      <Form.Group className="pt-3">
                        <input
                          type="file"
                          onChange={(e) =>
                            setItem({ ...item, photo: e.target.files[0] })
                          }
                          required
                        />
                      </Form.Group>

                      <div className="text-center pt-3">
                        <Button
                          onClick={() => handleUpdatePhoto(editingPhotoItemId)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Creating..." : "update photo"}
                        </Button>
                      </div>
                    </>
                  )}
                </td>
                <td>
                  {editingItemId === item._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(item._id)}
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleEdit(item._id, item.description, item.price)
                        }
                        className="btn btn-info"
                      >
                        Edit
                      </button>
                      {item.inStock ? (
                        <>
                          <button
                            onClick={() => handleRestrict(item._id)}
                            className="m-3 btn btn-danger"
                          >
                            Retire
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleShow(item._id)}
                            className="m-3 btn btn-success"
                          >
                            Show
                          </button>
                        </>
                      )}

                      {editingPhotoItemId === item._id ? (
                        <>
                          <button
                            onClick={handleCancelPhotoEdit}
                            className="btn btn-secondary"
                          >
                            Cancel photo edit
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditPhoto(item._id)}
                            className="btn btn-info"
                          >
                            Edit Photo
                          </button>
                        </>
                      )}
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

export default GetItem;
