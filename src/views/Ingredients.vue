<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Zutaten</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Zutaten</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <strong>Zutatenliste noch leer</strong>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
export default  {
  name: 'Ingredients',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>