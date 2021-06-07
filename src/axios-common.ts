import axios from 'axios';

export const recipeDbApi = axios.create({
  baseURL: `http://localhost:8000/api`,
  timeout: 30000,
})
