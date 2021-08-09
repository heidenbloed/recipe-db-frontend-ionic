<template>
  <RecipeDetail :id="$route.params.id">
  </RecipeDetail>
</template>

<script lang="ts">
  import RecipeDetail from "@/components/recipe/RecipeDetail.vue";
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Recipe',
    components: { RecipeDetail }
  })
</script>