<template>
  <div class="ion-padding-bottom">
    <ion-skeleton-text v-if="!imageUrls" animated  style="height: 250px"/>

    <ion-slides v-if="!onlyFirstImage && imageUrls && imageUrls.length > 0" pager="true" :options="slideOpts">
      <ion-slide v-for="imageUrl, idx in imageUrls" :key="idx">
        <ion-img :src="imageUrl" :alt="'Foto ' + idx"/>
      </ion-slide>
    </ion-slides>

    <ion-img v-if="onlyFirstImage && imageUrls && imageUrls.length > 0" :src="imageUrls[0]" alt="Foto 1"/>

    <ion-img v-if="imageUrls && imageUrls.length === 0" :src="require('@/assets/img/default_recipe_image.png')" alt="Beispielfoto"/>
  </div>
</template>

<script lang="js">
  import { defineComponent } from 'vue';
  import { IonSlides, IonSlide, IonSkeletonText, IonImg } from '@ionic/vue';
  export default defineComponent({
    name: 'RecipeImageSlides',
    components: { IonSlides, IonSlide, IonSkeletonText, IonImg },
    props: {
      imageUrls: Array,
      onlyFirstImage: Boolean,
    },
    setup() {
      const slideOpts = {
        speed: 400
      };
      return { slideOpts }
    },
  })
</script>

<style scoped>
  ion-slides {
    --bullet-background: var(--ion-color-step-700);
  }
</style>