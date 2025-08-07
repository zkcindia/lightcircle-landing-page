import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;
console.log(URL);

const tokenData = localStorage.getItem("token");
const token = JSON.parse(tokenData);

// CREATE PRODUCT
export async function createProduct(data) {
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

// ✅ DELETE PRODUCT BY ID
export async function deleteProduct(productId) {
  const token = JSON.parse(localStorage.getItem("token"));

  try {
    const response = await axios.delete(`${URL}/item/${productId}/`, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
      },
    });
    return response;
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
}

// ✅ EDIT (UPDATE) PRODUCT BY ID
export async function editProduct(productId, updatedData) {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await axios.put(`${URL}/item/${productId}/`, updatedData, {
      headers: {
        Authorization: `Bearer ${token?.access}`,
        "Content-Type": "multipart/form-data", // Required if using FormData
      },
    });
    return response;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw error;
  }
}
// Get product by ID
export async function getProductById(id) {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.get(`${URL}/item/${id}/`, {
    headers: {
      Authorization: `Bearer ${token?.access}`,
    },
  });
  return response;
}

