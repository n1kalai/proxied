"use client"; 

import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Cart } from "./cart";

const REGISTER_MUTATION = gql`
  mutation Register {
    register {
      _id
      token
      cartId
    }
  }
`;

type InitialState = {
  isLoading: boolean;
  data: string | null;
}

export const UserPage = () => { 
    const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
    const [visitorToken, setVisitorToken] = useState<InitialState>({isLoading: true, data: null});

    useEffect(() => {
      const storedToken = localStorage.getItem("visitorToken");
      if(storedToken) {
        setVisitorToken({isLoading: false, data: storedToken});
      }
    }, []);
  
    const handleRegister = async () => {
      try {
        const response = await register();
        const token = response.data.register.token;
  
        // Store token in localStorage
        localStorage.setItem("visitorToken", token);
        setVisitorToken(token);
      } catch (err) {
        console.error("Registration failed", err);
      }
    };


  if(visitorToken.isLoading) return <p>Loading...</p>


  return (
    <div>
      {visitorToken ? (
        <Cart />
      ) : (
        <>
          <h2>User Registration</h2>
          <button onClick={handleRegister} disabled={loading} className="border border-solid border-black p-4">
            {loading ? "Registering..." : "Register"}
          </button>
        </>
      )}
    {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
  </div>)

}

