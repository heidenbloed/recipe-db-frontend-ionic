<template>
  <InfinityList
    title="Rezepte"
    apiUrl="recipes/"
  >
    <template v-slot:default="slotProps">
      <RecipeCard 
        :id="slotProps.id"
        :lastUpdate="slotProps.lastUpdate"
      ></RecipeCard>
    </template>
  </InfinityList>
</template>

<script lang="ts">
  import RecipeCard from "@/components/RecipeCard.vue";
  import InfinityList from "@/components/InfinityList.vue";
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Recipes',
    components: { RecipeCard, InfinityList }
  })
</script>