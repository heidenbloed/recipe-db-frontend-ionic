<template>
  <UpdatableCard
    apiUrl="recipes/"
    :title="recipeName"
    :id="id"
    :lastUpdate="lastUpdate"
    @cardDataUpdated="updateRecipeData"
  >
    Dauert {{prepTimeStr}} <br>
    Quelle: {{source}} <br>
    Stichwörter: {{labelsStr}} <br>
    Zutaten: {{ingredientsStr}}
  </UpdatableCard>
</template>

<script lang="ts">
  import UpdatableCard from './UpdatableCard.vue';
  import { recipeDbApi } from './../axios-common';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'RecipeCard',
    components: { UpdatableCard },
    props: {
      id: Number,
      lastUpdate: Number
    },
    data (){
      return {
        recipeName: "Rezept " + this.id,
        prepTime: 0,
        source: "???",
        labels: [],
        ingredients: [],
      }
    },
    computed: {
      prepTimeStr(): string {
        return this.prepTime + " min"
      },
      labelsStr(): string {
        return this.labels.join(", ")
      },
      ingredientsStr(): string {
        return this.ingredients.map((ingredient: any) => {
          return ingredient.quantity + "" + ingredient.unit + " " + ingredient.name
        }).join(", ")
      }
    },
    methods: {
      async updateRecipeData(recipeData: any) {
        console.debug("updateRecipeData of recipe " + this.id)
        this.recipeName = recipeData.name;
        this.prepTime = recipeData.preparation_time;
        this.source = recipeData.source;
        this.labels = await Promise.all(recipeData.labels.map(this.getLabelName));
        this.ingredients = await Promise.all(recipeData.quantified_ingredients.map(this.getQuantifiedIngredientData));
      },
      async getLabelName(labelId: number): Promise<string> {
        const response = await recipeDbApi.get("labels/" + labelId + "/")
        return response.data.name
      },
      async getQuantifiedIngredientData(quantfiedIngredientId: number): Promise<any> {
        const quantIngredientResponse = await recipeDbApi.get("quantified_ingredients/" + quantfiedIngredientId + "/")
        const ingredientResponse = await recipeDbApi.get("ingredients/" + quantIngredientResponse.data.ingredient + "/")
        const unitResponse = await recipeDbApi.get("units/" + ingredientResponse.data.unit + "/")
        return {
          name: ingredientResponse.data.name,
          unit: unitResponse.data.short_form,
          quantity: quantIngredientResponse.data.quantity
        }
      }
    },
})
</script>