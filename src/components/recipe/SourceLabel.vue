<template>
  <div>
    <ion-icon :icon="bookOutline"></ion-icon>
    {{source}}
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { bookOutline } from 'ionicons/icons';
  export default defineComponent({
    name: 'SourceLabel',
    components: {},
    props: {
      source: {
        type: String,
        required: true
      },
    },
    setup() {
      return {
        bookOutline,
      }
    },
  })
</script>