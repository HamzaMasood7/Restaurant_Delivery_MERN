import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../api/user";

export const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const userJSON = localStorage.getItem("user");
        const { token } = JSON.parse(userJSON);

        const fetchedUser = await getUserById(id, token);
        setUser(fetchedUser);
        setFormData({
          firstName: fetchedUser.firstName,
          lastName: fetchedUser.lastName,
          displayName: fetchedUser.displayName,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userJSON = localStorage.getItem("user");
      const { token } = JSON.parse(userJSON);

      await updateUser(id, formData, token);
      setIsEditing(false);
      // Optional: Show a success message or perform any other actions
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">User Profile</h2>
        {user && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext">{formData.firstName}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext">{formData.lastName}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <p className="form-control-plaintext">{user.email}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="displayName" className="form-label">
                Display Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                />
              ) : (
                <p className="form-control-plaintext">{formData.displayName}</p>
              )}
            </div>

            {isEditing ? (
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Edit
              </button>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default Profile;
