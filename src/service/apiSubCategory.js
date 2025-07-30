import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

// fetch sub category
export const getSubCategory = async()=>{
     const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);
    
 const responce = await axios.get(`${URL}/subcategory-parent/`,{
     headers: {
      Authorization: `Bearer ${token.access}`,
    },
 })
 return responce;
}

// add subCategory
export const saveSubCategory = async(formData)=>{
    const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);

 const response = await axios.post(`${URL}/subcategory-parent/`, formData, {
    headers: {
      Authorization: `Bearer ${token.access}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}