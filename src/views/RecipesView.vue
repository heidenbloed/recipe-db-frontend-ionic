<template>
  <PageWithHeader title="Rezepte">
    <InfinityList
      apiUrl="recipes/"
    >
      <template v-slot:default="slotProps">
        <RecipeCard 
          :id="slotProps.id"
          :lastUpdate="slotProps.lastUpdate"
        ></RecipeCard>
      </template>
    </InfinityList>
  </PageWithHeader>
</template>

<script lang="js">
  import PageWithHeader from "@/components/PageWithHeader.vue";
  import RecipeCard from "@/components/recipe/RecipeCard.vue";
  import InfinityList from "@/components/InfinityList.vue";
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'RecipesView',
    components: { PageWithHeader, RecipeCard, InfinityList }
  })
</script>