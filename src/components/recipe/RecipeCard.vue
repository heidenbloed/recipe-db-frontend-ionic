<template>
  <UpdatableCard
    detailUrl="/tabs/recipe/"
    :title="recipeData.name"
    :id="id"
    :lastUpdate="lastUpdate"
    @cardDataUpdated="updateRecipeData"
  >
    <RecipeImageSlides :imageUrls="recipeImageUrls" onlyFirstImage/>

    <PrepTimeLabel :prepTime="recipeData.prepTime"></PrepTimeLabel>
  </UpdatableCard>
</template>

<script lang="js">
  import UpdatableCard from '@/components/UpdatableCard.vue';
  import PrepTimeLabel from "@/components/recipe/PrepTimeLabel.vue"
  import RecipeImageSlides from "@/components/recipe/RecipeImageSlides.vue"
  import { defineComponent } from 'vue';
  import { getRecipeData } from '@/api/recipeDetails' 
  export default defineComponent({
    name: 'RecipeCard',
    components: { UpdatableCard, PrepTimeLabel, RecipeImageSlides },
    props: {
      id: Number,
      lastUpdate: Number
    },
    data (){
      return {
        recipeData: {},
      }
    },
    computed: {
      recipeImageUrls() {
        if (this.recipeData.images) {
          return this.recipeData.images.map((imgData) => {return imgData.imageUrl});
        } else {
          return undefined;
        }
      },
    },
    methods: {
      async updateRecipeData() {
        console.debug("updateRecipeData of recipe " + this.id)
        this.recipeData = await getRecipeData(this.id);
      },
    },
})
</script>