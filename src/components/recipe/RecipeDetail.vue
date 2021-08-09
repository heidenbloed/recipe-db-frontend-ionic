<template>
  <PageWithHeader :title="title">
    <ion-content :fullscreen="true">
      <PrepTimeLabel :prepTime="recipeData.prepTime"></PrepTimeLabel>
      <SourceLabel :source="recipeData.source"></SourceLabel>
      <p>{{recipeData}}</p>
    </ion-content>
  </PageWithHeader>
</template>

<script lang="ts">
  import PageWithHeader from "@/components/PageWithHeader.vue";
  import PrepTimeLabel from "@/components/recipe/PrepTimeLabel.vue"
  import SourceLabel from "@/components/recipe/SourceLabel.vue"
  import { defineComponent } from 'vue';
  import { IonContent } from '@ionic/vue';
  import { getRecipeData } from '@/api/recipeDetails' 
  export default defineComponent({
    name: 'RecipeDetail',
    components: { PageWithHeader, IonContent, PrepTimeLabel, SourceLabel },
    props: {
      id: {
        type: Number,
        required: true
      },
    },
    data (){
      return {
        recipeData: {
          name: "Rezeptdetails"
        }
      }
    },
    computed: {
      title(): string {
        return this.recipeData.name
      }
    },
    async mounted() {
      this.recipeData = await getRecipeData(this.id);
    },
  })
</script>