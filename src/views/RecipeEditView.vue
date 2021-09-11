<template>
  <RecipeEdit :id="id"/>
</template>

<script lang="js">
  import RecipeEdit from "@/components/recipe/RecipeEdit.vue";
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Recipe',
    components: { RecipeEdit },
    computed: {
      id() {
        const id = Number.parseInt(this.$route.params.id)
        if (Number.isNaN(id)) {
          return -1
        }
        return id
      },
    },
    mounted() {
      console.log("lol")
    }
  })
</script>