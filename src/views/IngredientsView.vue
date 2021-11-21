<template>
  <PageWithHeader title="Zutaten">
    <InfinityList
      apiUrl="ingredients/"
    >
      <template v-slot:default="slotProps">
        <IngredientCard 
          :id="slotProps.id"
          :lastUpdate="slotProps.lastUpdate"
        ></IngredientCard>
      </template>
    </InfinityList>
  </PageWithHeader>
</template>

<script lang="js">
  import PageWithHeader from "@/components/PageWithHeader.vue";
  import IngredientCard from "@/components/IngredientCard.vue";
  import InfinityList from "@/components/InfinityList.vue";
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'IngredientsView',
    components: { PageWithHeader, IngredientCard, InfinityList }
  })
</script>