import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Save a new category
export const saveCategory = async (formData) => {
  const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);

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
  const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);
  
  const res = await axios.get(`${URL}/category/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return res;
};
export const getCategoryById = async (id) => {
  const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);
  
  const res = await axios.get(`${URL}/category/${id}/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return res;
};


// ✅ Delete a category
export const deleteCategory = async (id) => {
  const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);

  const res = await axios.delete(`${URL}/category/${id}/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return res;
};

// ✅ Edit/Update an existing category
export const editCategory = async (id, formData) => {
  const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);

  const res = await axios.put(`${URL}/category/${id}/`, formData, {
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};


// ✅ Get single category by ID or Slug
export async function getSingleCategory(idOrSlug) {
  const token = JSON.parse(localStorage.getItem("token"));

  return await axios.get(`${URL}/${idOrSlug}/`, {
    headers: {
      Authorization: `Bearer ${token?.access}`,
    },
  });
}
