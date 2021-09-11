import { recipeDbApi } from './../axios-common';

interface QunatifiedIngredient {
  id: number;
  updatedAt: number;
  name: string;
  ingredientId: number;
  unit: string;
  unitId: number;
  quantity: number;
}

interface Label {
  id: number;
  name: string;
}

interface RecipeImage {
  id: number;
  updatedAt: number;
  imageUrl: string;
}

interface RecipeData {
  id: number;
  updatedAt: number;
  name: string;
  prepTime: number;
  source: string;
  labels: Label[];
  ingredients: QunatifiedIngredient[];
  images: RecipeImage[];
}

async function getLabel(labelId: number): Promise<Label> {
  const response = await recipeDbApi.get("labels/" + labelId + "/")
  return response.data;
}

async function getQuantifiedIngredientData(quantfiedIngredientId: number): Promise<QunatifiedIngredient> {
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

async function getRecipeImage(recipeImageId: number): Promise<RecipeImage> {
  const response = await recipeDbApi.get("recipe_image/" + recipeImageId + "/")
  return {
    id: response.data.id,
    updatedAt: response.data.updated_at,
    imageUrl: response.data.image,
  };
}

async function getRecipeData(id: number): Promise<RecipeData> { 
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

export { getRecipeData }