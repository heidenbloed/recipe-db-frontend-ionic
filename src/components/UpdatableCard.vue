<template>
  <IonCard @click="detailUrl && $router.push(detailUrl+id+'/')">
    <IonCardHeader>
      <IonCardTitle>
        <span v-if="title">{{title}}</span>
        <ion-skeleton-text v-if="!title" animated></ion-skeleton-text>
      </IonCardTitle>
    </IonCardHeader>

    <IonCardContent>
      <slot></slot>
    </IonCardContent>
  </IonCard>
</template>

<script lang="js">
  import { IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonSkeletonText } from '@ionic/vue';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'UpdatableCard',
    components: { IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonSkeletonText },
    props: {
      title: String,
      detailUrl: {
        type: String,
        required: false,
        default: null
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
        this.$emit('cardDataUpdated');
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