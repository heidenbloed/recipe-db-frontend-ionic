<template>
  <IconLabel :icon="timeOutline" :loaded="prepTime !== undefined">
    <span v-if="fullHours > 0"><b>{{fullHours}}</b>h </span>
    <span><b>{{remaindingMinutes}}</b>min</span>
  </IconLabel>
</template>

<script lang="js">
  import IconLabel from "@/components/recipe/IconLabel.vue"
  import { defineComponent} from 'vue';
  import { timeOutline } from 'ionicons/icons';
  export default defineComponent({
    name: 'PrepTimeLabel',
    components: { IconLabel },
    props: {
      prepTime: Number,
    },
    setup() {
      return {
        timeOutline,
      }
    },
    computed: {
      fullHours() {
        return Math.floor(this.prepTime / 60);
      },
      remaindingMinutes() {
        return this.prepTime % 60;
      },
    },
  })
</script>
