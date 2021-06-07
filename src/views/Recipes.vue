<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Rezepte</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <IonContent>
        <IonGrid fixed>
          <RecipeCard v-for="recipeId in recipeIds" :id="recipeId" :key="recipeId"></RecipeCard>
        </IonGrid>
      </IonContent>
    
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid} from '@ionic/vue';
import RecipeCard from "@/components/RecipeCard.vue";
import { recipeDbApi } from './../axios-common';
export default  {
  name: 'Recipes',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonGrid, RecipeCard },
  data() {
    return {
      recipeIds: []
    }
  },
  mounted() {
    (this as any).updateRecipeIds();
  },
  methods: {
    updateRecipeIds() {
      recipeDbApi.get("recipes/")
      .then(response => {
        (this as any).recipeIds = response.data.map((recipe: any) => recipe.id);
      })
      .catch(e => {
        console.error(e)
      })
    }
  }
}
</script>