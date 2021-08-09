<template>
  <div>
    <ion-icon :icon="timeOutline"></ion-icon>
    <span v-if="fullHours > 0"><b>{{fullHours}}</b>h </span>
    <span><b>{{remaindingMinutes}}</b>min</span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { timeOutline } from 'ionicons/icons';
  export default defineComponent({
    name: 'PrepTimeLabel',
    components: {},
    props: {
      prepTime: {
        type: Number,
        required: true
      },
    },
    setup() {
      return {
        timeOutline,
      }
    },
    computed: {
      fullHours(): number {
        return Math.floor(this.prepTime / 60);
      },
      remaindingMinutes(): number {
        return this.prepTime % 60;
      },
    },
  })
</script>