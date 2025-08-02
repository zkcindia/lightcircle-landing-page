import axios from "axios";
const URL = process.env.NEXT_PUBLIC_API_URL;
console.log(URL);
const tokenData = localStorage.getItem("token");
const token = JSON.parse(tokenData);

// lib/apiCreate.js
export async function createProduct(data) {
  try {
    const response = await axios.post(`${URL}/item/`,data, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
    return response
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}
