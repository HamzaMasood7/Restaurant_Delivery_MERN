import { useState } from "react";
//import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  //const { dispatch } = useAuthContext();

  const signup = async (first, last, displayName, email, password) => {
    setIsLoading(true);
    setError(null);
    console.log(email);
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: first,
        lastName: last,
        displayName: displayName,
        email: email,
        password: password,
      }),
    });
    const json = await response.json();

    if (response.ok) {
      setSuccess(json.msg);
      setIsLoading(false);
    }

    if (!response.ok) {
      setIsLoading(false);
      setError(json.msg);
    }
  };

  return { signup, isLoading, error, success };
};
