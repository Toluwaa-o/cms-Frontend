import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://cms-api-cd7r.onrender.com/cms-api',
    withCredentials: true
})

export default instance