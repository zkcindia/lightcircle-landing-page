import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

// login
export const handleLogin=async(data)=>{
    const response = await axios.post(`${URL}/api/token/`,data);
    return response;
}