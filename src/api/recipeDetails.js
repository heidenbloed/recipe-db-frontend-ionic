import { recipeDbApi } from '../axios-common';

// interface QunatifiedIngredient {
//   id: number;
//   updatedAt: number;
//   name: string;
//   ingredientId: number;
//   unit: string;
//   unitId: number;
//   quantity: number;
// }

// interface Label {
//   id: number;
//   name: string;
// }

// interface RecipeImage {
//   id: number;
//   order: number;
//   updatedAt: number;
//   imageUrl: string;
// }

// interface RecipeData {
//   id: number;
//   updatedAt: number;
//   name: string;
//   prepTime: number;
//   source: string;
//   labels: Label[];
//   ingredients: QunatifiedIngredient[];
//   images: RecipeImage[];
// }

async function getLabel(labelId){
  const response = await recipeDbApi.get("labels/" + labelId + "/")
  return response.data;
}

async function getQuantifiedIngredientData(quantfiedIngredientId){
  const quantIngredientResponse = await recipeDbApi.get("quantified_ingredients/" + quantfiedIngredientId + "/")
  const ingredientId = quantIngredientResponse.data.ingredient;
  const ingredientResponse = await recipeDbApi.get("ingredients/" + ingredientId + "/")
  const unitId = ingredientResponse.data.unit;
  const unitResponse = await recipeDbApi.get("units/" + unitId + "/");
  return {
    id: quantfiedIngredientId,
    updatedAt: Math.max(quantIngredientResponse.data.updated_at, ingredientResponse.data.updated_at),
    name: ingredientResponse.data.name,
    ingredientId: ingredientId,
    unit: unitResponse.data.short_form,
    unitId: unitId,
    quantity: quantIngredientResponse.data.quantity
  }
}

async function getRecipeImage(recipeImageId){
  const response = await recipeDbApi.get("recipe_image/" + recipeImageId + "/")
  return {
    id: response.data.id,
    order: response.data.order,
    updatedAt: response.data.updated_at,
    imageUrl: response.data.image,
  };
}

async function getRecipeData(id){ 
  console.debug("getRecipeData of recipe " + id)
  const response = await recipeDbApi.get("recipes/" + id + "/");
  return {
    id: id,
    updatedAt: response.data.updated_at,
    name: response.data.name,
    prepTime: response.data.preparation_time,
    source: response.data.source,
    labels: await Promise.all(response.data.labels.map(getLabel)),
    ingredients: await Promise.all(response.data.quantified_ingredients.map(getQuantifiedIngredientData)),
    images: await Promise.all(response.data.recipe_images.map(getRecipeImage)),
  }
}

async function uploadRecipeImage(imageBlob, recipeId, order){
  const formData = new FormData();
  formData.append('image', imageBlob, `recipe_image_${recipeId}.png`);
  formData.append('order', order.toString());
  formData.append('recipe', recipeId.toString());
  const response = await recipeDbApi.post("recipe_image/", formData, {headers: {'Content-Type': 'multipart/form-data'}});
  console.debug(response);
  return response.data;
}

async function updateRecipeImageOrder(recipeImageId, order){
  const formData = new FormData();
  formData.append('order', order.toString());
  const response = await recipeDbApi.patch("recipe_image/" + recipeImageId + "/", formData, {headers: {'Content-Type': 'multipart/form-data'}});
  console.debug(response);
  return response.data;
}

async function deleteRecipeImage(recipeImageId){
  const response = await recipeDbApi.delete("recipe_image/" + recipeImageId + "/");
  console.debug(response);
  return response.data;
}

export { getRecipeData, uploadRecipeImage, updateRecipeImageOrder, deleteRecipeImage }