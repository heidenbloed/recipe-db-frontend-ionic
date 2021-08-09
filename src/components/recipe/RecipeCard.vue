<template>
  <UpdatableCard
    detailUrl="tabs/recipe/"
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
  import UpdatableCard from '@/components/UpdatableCard.vue';
  import { defineComponent } from 'vue';
  import { getRecipeData } from '@/api/recipeDetails' 
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
      async updateRecipeData() {
        console.debug("updateRecipeData of recipe " + this.id)
        const recipeData = await getRecipeData(this.id);
        this.recipeName = recipeData.name;
        this.prepTime = recipeData.prepTime;
        this.source = recipeData.source;
        this.labels = recipeData.labels.map(label => label.name)
        this.ingredients = recipeData.ingredients;
      },
    },
})
</script>