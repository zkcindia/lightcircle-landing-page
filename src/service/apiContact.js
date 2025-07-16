import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;


// post contact us form
export const saveContactUs =async(data)=>{
    const res = await axios.post(`${URL}/contact/`,data);
    return res;
}