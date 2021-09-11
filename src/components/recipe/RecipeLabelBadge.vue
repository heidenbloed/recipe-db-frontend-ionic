<template>
  <div class="badge" :style="backgroundStyle">
    <slot>
      {{category}}
    </slot>
  </div>
</template>

<script lang="js">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'RecipeLabelBadge',
    components: {},
    props: {
      category: String,
    },
    computed: {
      backgroundStyle() {
        let bgcolor = undefined;
        if (this.category === "complexity") {
          bgcolor = '#ff7675';
        } else if (this.category === "diet") {
          bgcolor = '#00b894';
        }else if (this.category === "cuisine") {
          bgcolor = '#fdcb6e';
        }
        if (bgcolor) {
          return { background: bgcolor }
        } else{
          return {}
        }
      }
    },
  })
</script>

<style scoped>
  div.badge {
    display: inline-block;
    border-radius: 0.35em;
    background: var(--ion-color-primary);
    color: white;
    font-weight: bold;
    padding-right: 0.5em;
    padding-left: 0.5em;
    padding-top: 0.3em;
    padding-bottom: 0.3em;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
    font-size: small;
  }
</style>