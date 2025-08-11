import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

function getToken() {
  if (typeof window === "undefined") return null; // ⬅ Skip if on server
  const tokenData = localStorage.getItem("token");
  return tokenData ? JSON.parse(tokenData) : null;
}

// ✅ Save a new category
export const saveCategory = async (formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const res = await axios.post(`${URL}/category/`, formData, {
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

// ✅ Get all categories
export const getCategory = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const res = await axios.get(`${URL}/category/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return res;
};

// ✅ Delete a category
export const deleteCategory = async (id) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const res = await axios.delete(`${URL}/category/${id}/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return res;
};

// ✅ Edit/Update an existing category
export const editCategory = async (id, formData) => {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const res = await axios.put(`${URL}/category/${id}/`, formData, {
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
