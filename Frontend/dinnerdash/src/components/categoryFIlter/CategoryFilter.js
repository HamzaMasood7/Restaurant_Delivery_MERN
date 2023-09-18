import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../api/getCategories";
import { fetchItemsByCategories, fetchItems } from "../../api/Items";
import "./CategoryFilter.css";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const CategoryFilter = ({ setCartItemCount }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleCategoryChange = (categoryId) => {
    const selected = selectedCategories.includes(categoryId);

    if (selected) {
      const updatedCategories = selectedCategories.filter(
        (id) => id !== categoryId
      );
      setSelectedCategories(updatedCategories);
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleAddToCart = (item) => {
    if (!item.inStock) {
      const notify = () =>
        toast.error("Item is not in stock and cannot be added to cart!");
      notify();
      return;
    }

    const updatedCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      updatedCartItems[existingItemIndex].quantity++;
    } else {
      updatedCartItems.push({ ...item, quantity: 1 });
    }

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItemCount(updatedCartItems.length);
    const notify = () => toast.success(item.title + " added to cart!");
    notify();
  };

  const handleRemoveFromCart = (item) => {
    const updatedCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItemIndex !== -1) {
      const updatedItem = { ...updatedCartItems[existingItemIndex] };

      if (updatedItem.quantity > 1) {
        updatedItem.quantity--;
        updatedCartItems[existingItemIndex] = updatedItem;
      } else {
        updatedCartItems.splice(existingItemIndex, 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      setCartItemCount(updatedCartItems.length);
      const notify = () => toast.success(item.title + " removed to cart!");
      notify();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(categoryData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleFilterItems = async () => {
      try {
        if (selectedCategories.length === 0) {
          const itemsData = await fetchItems();
          setItems(itemsData);
        } else {
          const itemsData = await fetchItemsByCategories(selectedCategories);
          setItems(itemsData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleFilterItems();
  }, [selectedCategories]);

  return (
    <div className="category-filter-container">
      <ToastContainer />
      <div className="categories">
        <h2>Categories</h2>
        {categories.map((category) => (
          <div key={category._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category._id)}
                onChange={() => handleCategoryChange(category._id)}
              />
              {category.title}
            </label>
          </div>
        ))}
      </div>
      <div className="items">
        <h2 className="bg-white display-1">Menu</h2>
        <div className="item-grid">
          {currentItems.map((item) => (
            <div key={item._id} className="card bg-transparent">
              <div className="card-body filterCard">
                <h5 className="card-title">{item.title}</h5>
                <Link to={"/item/" + item._id}>Show Details</Link>
                <img
                  src={
                    item.photo
                      ? item.photo
                      : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
                  }
                  alt="item"
                  className="card-img-top"
                />

                <p className="card-text">Price: {item.price}</p>
                <div className="quantity-container">
                  <Button
                    className=""
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    -
                  </Button>
                  <span>{item.quantity}</span>
                  <Button className="m-1" onClick={() => handleAddToCart(item)}>
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          {pageNumbers.map((pageNumber) => (
            <Button
              key={pageNumber}
              onClick={() => handlePaginationClick(pageNumber)}
              className={pageNumber === currentPage ? "active" : ""}
            >
              {pageNumber}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
