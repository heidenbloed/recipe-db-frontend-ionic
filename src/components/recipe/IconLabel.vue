<template>
  <div>
    <div class="left">
      <ion-icon :icon="icon" size="small"></ion-icon>
      &nbsp;
    </div>
    <div class="expand">
      <slot v-if="loaded"></slot>
      <ion-skeleton-text v-if="!loaded" animated></ion-skeleton-text>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { IonIcon, IonSkeletonText } from '@ionic/vue';
  export default defineComponent({
    name: 'IconLabel',
    components: { IonIcon, IonSkeletonText },
    props: {
      icon: String,
      loaded: Boolean,
    },
  })
</script>

<style scoped>
  div {
    overflow: hidden;
  }

  .left {
    float: left;
  }

  .expand {
    float: none;
  }
</style>