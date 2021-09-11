<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="ingredients" href="/tabs/ingredients">
          <ion-icon :icon="restaurantOutline"></ion-icon>
          <ion-label>Zutaten</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="recipes" href="/tabs/recipes">
          <ion-icon :icon="fastFoodOutline"></ion-icon>
          <ion-label>Rezepte</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="shoppinglist" href="/tabs/shoppinglist">
          <ion-icon :icon="listOutline"></ion-icon>
          <ion-label>Einkaufsliste</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { fastFoodOutline, restaurantOutline, listOutline } from 'ionicons/icons';
export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      fastFoodOutline,
      restaurantOutline,
      listOutline
    }
  }
}
</script>