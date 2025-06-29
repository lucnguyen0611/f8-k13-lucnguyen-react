import axios from 'axios'


const api = axios.create({
  baseURL: 'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com/docs#'
  // baseURL: 'http://localhost:3001'
})

export default api