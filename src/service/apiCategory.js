import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;
const tokenData = localStorage.getItem("token");
const token = JSON.parse(tokenData)
// console.log(token);


export const saveCategory = async (data) => {
  const res = await axios.post(`${URL}/create-category/`,data,{
 headers: {
      Authorization: `Bearer ${token.access}`, // or just `token` depending on your backend
      'Content-Type': 'application/json',
    },
  });
  return res;
};
