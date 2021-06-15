<template>
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{{title}}</IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      <slot></slot>
    </IonCardContent>
  </IonCard>
</template>

<script lang="ts">
  import { IonCard, IonCardContent, IonCardTitle, IonCardHeader } from '@ionic/vue';
  import { recipeDbApi } from './../axios-common';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'UpdatableCard',
    components: { IonCard, IonCardContent, IonCardTitle, IonCardHeader },
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      id: {
        type: Number,
        required: true
      },
      lastUpdate: {
        type: Number,
        required: true
      },
    },
    emits: ['cardDataUpdated'],
    mounted() {
      this.updateData();
    },
    methods: {
      async updateData() {
        console.debug("updateData of card " + this.id)
        const response = await recipeDbApi.get(this.apiUrl + this.id + "/");
        const cardData = response.data;
        this.$emit('cardDataUpdated', cardData);
      },
    },
    watch: {
      async lastUpdate(oldUpdatedAt, newUpdatedAt) {
        console.debug("lastUpdate of card " + this.id + " changed from " + oldUpdatedAt + " to " + newUpdatedAt);
        await this.updateData();
      }
    }
})
</script>