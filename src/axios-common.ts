import axios from 'axios';

const recipeDbApi = axios.create({
  baseURL: `http://192.168.2.122/api`,
  // baseURL: `http://localhost:8000/api`,
  timeout: 30000,
});

recipeDbApi.interceptors.response.use((response) => response, (error) => {
  console.error("RecipeDbApi error: " + error);
});

export { recipeDbApi };