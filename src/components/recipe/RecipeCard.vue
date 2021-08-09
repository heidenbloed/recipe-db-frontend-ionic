<template>
  <UpdatableCard
    detailUrl="tabs/recipe/"
    :title="recipeData.name"
    :id="id"
    :lastUpdate="lastUpdate"
    @cardDataUpdated="updateRecipeData"
  >
    <PrepTimeLabel :prepTime="recipeData.prepTime"></PrepTimeLabel>
  </UpdatableCard>
</template>

<script lang="ts">
  import UpdatableCard from '@/components/UpdatableCard.vue';
  import PrepTimeLabel from "@/components/recipe/PrepTimeLabel.vue"
  import { defineComponent } from 'vue';
  import { getRecipeData } from '@/api/recipeDetails' 
  export default defineComponent({
    name: 'RecipeCard',
    components: { UpdatableCard, PrepTimeLabel },
    props: {
      id: Number,
      lastUpdate: Number
    },
    data (){
      return {
        recipeData: {},
      }
    },
    methods: {
      async updateRecipeData() {
        console.debug("updateRecipeData of recipe " + this.id)
        this.recipeData = await getRecipeData(this.id);
      },
    },
})
</script>