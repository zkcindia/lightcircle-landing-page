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


// delete subcategory
export const deleteSubCategory = async (id) => {
  const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);

  const response = await axios.delete(`${URL}/subcategory-parent/${id}/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
};


// sub category by id .


export const getSubCategoryById = async (id) => {
  const tokenData = localStorage.getItem("token");
  const token = JSON.parse(tokenData);

  const response = await axios.get(`${URL}/subcategory-parent/${id}/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response;
};
