import axios from 'axios'; 
// in production, there's no localhost so we have to make this dynamic 
const Base_URl = import.meta.env.MODE === 'development' ? "http://localhost:5001/api" : "/api"; 
const api = axios.create({ baseURL:Base_URl, }) 
export default api;