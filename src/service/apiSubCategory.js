import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;
console.log(URL);

// ✅ Helper to get token safely (browser only)
function getToken() {
  if (typeof window === "undefined") return null; // SSR safety
  const tokenData = localStorage.getItem("token");
  return tokenData ? JSON.parse(tokenData) : null;
}

// ✅ Fetch sub category
export async function getSubCategory() {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${URL}/subcategory-parent/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
}

// ✅ Add subCategory
export async function saveSubCategory(formData) {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const response = await axios.post(`${URL}/subcategory-parent/`, formData, {
    headers: {
      Authorization: `Bearer ${token.access}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

// ✅ Delete subcategory
export async function deleteSubCategory(id) {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const response = await axios.delete(`${URL}/subcategory-parent/${id}/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
}

// ✅ Get sub category by ID
export async function getSubCategoryById(id) {
  const token = getToken();
  if (!token) throw new Error("No token found");

  const response = await axios.get(`${URL}/category/sub/${id}/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
}
