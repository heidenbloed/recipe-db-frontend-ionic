<template>
  <UpdatableCard
    apiUrl="ingredients/"
    :title="ingredientData.name"
    :id="id"
    :lastUpdate="lastUpdate"
    @cardDataUpdated="updateIngredientData"
  >
    {{ingredientData}}
  </UpdatableCard>
</template>

<script lang="js">
  import UpdatableCard from '@/components/UpdatableCard.vue';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'IngredientCard',
    components: { UpdatableCard },
    props: {
      id: Number,
      lastUpdate: Number
    },
    data (){
      return {
        ingredientData: {
          name: "Zutat " + this.id,
        }
      }
    },
    methods: {
      async updateIngredientData(ingredientData) {
        console.debug("updateIngredientData of ingredient " + this.id)
        this.ingredientData = ingredientData;
      },
    },
})
</script>