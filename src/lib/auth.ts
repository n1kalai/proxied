import { gql } from "@apollo/client";
import { client } from "./apollo-client";

const REGISTER_MUTATION = gql`
  mutation Register {
    register {
      _id
      token
    }
  }
`;

export const registerUser = async () => {
  const existingToken = localStorage.getItem("visitorToken");
  if (existingToken) return existingToken; // Use existing token

  try {
    const { data } = await client.mutate({ mutation: REGISTER_MUTATION });
    localStorage.setItem("visitorToken", data.register.token);
    return data.register.token;
  } catch (error) {
    console.error("Error registering user:", error);
    return null;
  }
};