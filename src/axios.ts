
import axios from 'axios';


// So api.get('/todo') becomes "/api/todo"
const api = axios.create({
    baseURL: '/api',
});

export default api;