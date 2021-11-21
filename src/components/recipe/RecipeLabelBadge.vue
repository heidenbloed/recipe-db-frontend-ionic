<template>
  <n-tag :color="tagColor">
    <slot>
      {{category}}
    </slot>
  </n-tag>
</template>

<script lang="js">
  import { defineComponent } from 'vue';
  import { 
    NTag
  } from 'naive-ui';

  export default defineComponent({
    name: 'RecipeLabelBadge',
    components: { NTag },
    props: {
      category: String,
    },
    computed: {
      tagColor() {
        let textColor = undefined;
        let backgroundColor = undefined;
        if (this.category === "complexity") {
          textColor='#ff7675';
          backgroundColor="#ffdbdb";
        } else if (this.category === "diet") {
          textColor='#00b894';
          backgroundColor="#d8f8f2";
        } else if (this.category === "cuisine") {
          textColor="#FCB040";
          backgroundColor="#feefd7"
        } else {
          textColor="#3880FF";
          backgroundColor="#e5efff";
        }
        return {
          color: backgroundColor,
          borderColor: textColor,
          textColor: textColor
        }
      }
    },
  })
</script>