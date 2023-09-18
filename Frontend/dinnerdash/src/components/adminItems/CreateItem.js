import React, { useState, useEffect } from "react";
import { createItems } from "../../api/Items";
import { fetchCategories } from "../../api/getCategories";
import { Form, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../../api/auth";

export const CreateItem = () => {
  const initialItemState = {
    title: "",
    description: "",
    price: null,
    category: [],
    photo: null,
  };

  const [item, setItem] = useState(initialItemState);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCategory = async () => {
    try {
      setIsLoading(true);
      const trimmedTitle = item.title.trim();
      const trimmedDescription = item.description.trim();

      if (trimmedTitle === "") {
        throw new Error("Title cannot be empty");
      }

      if (trimmedDescription === "") {
        throw new Error("description cannot be empty");
      }

      if (item.price < 1) {
        throw new Error("Price must be greater than 0");
      }

      if (item.category.length === 0) {
        throw new Error("Please select at least one category");
      }

      const formData = new FormData();
      formData.append("title", trimmedTitle);
      formData.append("description", trimmedDescription);
      formData.append("price", item.price);
      item.category.forEach((category) => {
        formData.append("category", category);
      });
      formData.append("photo", item.photo);

      const token = getToken();

      await createItems(formData, token);
      const notify = () => toast.success("Item created");
      notify();
      setItem(initialItemState);
    } catch (error) {
      const notify = () => toast.error(error.message);
      notify();
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();

        if (token) {
          const data = await fetchCategories(token);
          setCategories(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="w-50">
        <Form id="myForm">
          <ToastContainer />
          <Form.Group>
            <Form.Control
              type="text"
              value={item.title}
              onChange={(e) => setItem({ ...item, title: e.target.value })}
              required
              placeholder="Title"
            />
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Control
              type="text"
              required
              value={item.description}
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
              placeholder="Description"
            />
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Control
              type="number"
              required
              min={1}
              value={item.price}
              onChange={(e) => setItem({ ...item, price: e.target.value })}
              placeholder="Price"
            />
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Control
              as="select"
              multiple
              required
              onChange={(e) =>
                setItem({
                  ...item,
                  category: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  ),
                })
              }
              value={item.category}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="pt-3">
            <Form.Control
              type="file"
              onChange={(e) => setItem({ ...item, photo: e.target.files[0] })}
              required
            />
          </Form.Group>

          <div className="text-center pt-3">
            <Button onClick={handleCreateCategory} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Item"}
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};
