<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <span v-if="title">{{title}}</span>
          <ion-skeleton-text v-if="!title" animated></ion-skeleton-text>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <slot></slot>
  </ion-page>
</template>

<script lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonSkeletonText } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PageWithHeader',
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonSkeletonText },
    props: {
      title: String,
    },
  })
</script>