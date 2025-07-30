import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

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

export const getCategory = async (id) => {
  const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);
  
  const res = await axios.get(`${URL}/category/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return res;
};
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


// // edit api 
// export const editCategory = async (id, payload) => {
//   const tokenData = localStorage.getItem("token");
//   const token = JSON.parse(tokenData);

//   const formData = new FormData();
//   formData.append("image", payload.image);   
//   formData.append("name", payload.name);
//   formData.append("creator", payload.creator);
//   formData.append("stock", payload.stock);

//   const res = await axios.put(`${URL}/category/${id}/`, formData, {
//     headers: {
//       Authorization: `Bearer ${token.access}`,
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   return res.data;
// };