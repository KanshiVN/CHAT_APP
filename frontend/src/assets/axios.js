import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api', // Replace with your backend API URL
    withCredentials: true, // Enable CORS
})