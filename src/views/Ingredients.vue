<template>
  <InfinityList
    title="Zutaten"
    apiUrl="ingredients/"
  >
    <template v-slot:default="slotProps">
      <IngredientCard 
        :id="slotProps.id"
        :lastUpdate="slotProps.lastUpdate"
      ></IngredientCard>
    </template>
  </InfinityList>
</template>

<script lang="ts">
  import IngredientCard from "@/components/IngredientCard.vue";
  import InfinityList from "@/components/InfinityList.vue";
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Ingredients',
    components: { IngredientCard, InfinityList }
  })
</script>