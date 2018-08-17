import axios from 'axios'

const API_URL = process.env.PAPERLESSS_API_URL

export default axios.create({
  baseURL: API_URL
})
