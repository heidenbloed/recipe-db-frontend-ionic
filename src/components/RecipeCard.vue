<template>
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{{recipeName}}</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      Dauert {{prepTimeStr}} <br>
      Quelle: {{source}} <br>
      Stichwörter: {{labelsStr}} <br>
      Zutaten: {{ingredientsStr}}
    </IonCardContent>
  </IonCard>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardTitle, IonCardHeader } from '@ionic/vue';
import { recipeDbApi } from './../axios-common';
export default {
  name: 'RecipeCard',
  components: { IonCard, IonCardContent, IonCardTitle, IonCardHeader },
  props: {
    id: Number
  },
  data (){
    return {
      recipeName: "Rezept " + (this as any).id,
      prepTime: 0,
      source: "???",
      labels: [],
      ingredients: [],
    }
  },
  computed: {
    prepTimeStr(): string {
      return (this as any).prepTime + " min"
    },
    labelsStr(): string {
      return (this as any).labels.join(", ")
    },
    ingredientsStr(): string {
      return (this as any).ingredients.map((ingredient: any) => {
        return ingredient.quantity + "" + ingredient.unit + " " + ingredient.name
      }).join(", ")
    }
  },
  mounted() {
    (this as any).updateRecipeDetails();
  },
  methods: {
    async updateRecipeDetails() {
      const response = await recipeDbApi.get("recipes/" + (this as any).id + "/");
      (this as any).recipeName = response.data.name;
      (this as any).prepTime = response.data.preparation_time;
      (this as any).source = response.data.source;
      (this as any).labels = await Promise.all(response.data.labels.map((this as any).getLabelName));
      (this as any).ingredients = await Promise.all(response.data.quantified_ingredients.map((this as any).getQuantifiedIngredientData));
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
  }
}
</script>