"use client"; 

import { Cart } from "./cart";

import { useMutation } from "@apollo/client";
import { useUser } from "@/hooks/use-user";

import { REGISTER_MUTATION } from "@/services/mutations/register-mutations";



export const UserPage = () => { 
    const [register, { loading, error }] = useMutation(REGISTER_MUTATION);
    const {user, setUser} = useUser()

  
    const handleRegister = async () => {
      try {
        const response = await register();
        const token = response.data.register.token;
  
        // Store token in localStorage
        localStorage.setItem("visitorToken", token);
        setUser({isLoading: false, data: token});
      } catch (err) {
        console.error("Registration failed", err);
      }
    };


  if(user.isLoading) return <p>Loading...</p>


  return (
    <div>
      {user.data ? (
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

