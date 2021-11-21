<template>
  <RecipeDetail :id="id"/>
</template>

<script lang="js">
  import RecipeDetail from "@/components/recipe/RecipeDetail.vue";
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'RecipeView',
    components: { RecipeDetail },
    computed: {
      id() {
        const id = Number.parseInt(this.$route.params.id)
        if (Number.isNaN(id)) {
          return -1
        }
        return id
      },
    },
  })
</script>