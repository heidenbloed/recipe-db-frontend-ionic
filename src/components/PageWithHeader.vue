<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <slot></slot>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
  } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'PageWithHeader',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
    },
    props: {
      title: {
        type: String,
        required: true
      },
    },
  })
</script>