import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;
console.log(URL);

// ✅ Helper to safely get token only in the browser
function getToken() {
  if (typeof window === "undefined") return null; // Prevent SSR crash
  const tokenData = localStorage.getItem("token");
  return tokenData ? JSON.parse(tokenData) : null;
}

// CREATE PRODUCT
export async function createProduct(data) {
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.post(`${URL}/item/`, data, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// GET ALL PRODUCTS
export async function getAllProducts() {
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.get(`${URL}/item/`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// DELETE PRODUCT BY ID
export async function deleteProduct(productId) {
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.delete(`${URL}/item/${productId}/`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    return response;
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
}

// EDIT PRODUCT BY ID
export async function editProduct(productId, updatedData) {
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.put(`${URL}/item/${productId}/`, updatedData, {
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw error;
  }
}

// GET PRODUCT BY ID
export async function getProductById(id) {
  const token = getToken();
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.get(`${URL}/item/${id}/`, {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    return response;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

