<template>
  <div class="ion-padding-bottom">
    <ion-skeleton-text v-if="!imageUrls" animated  style="height: 100px"/>

    <div class="thumbnails">
      <div class="thumbnail" v-for="imageUrl, idx in imageUrls" :key="idx">
        <ion-img :src="imageUrl" :alt="'Foto ' + idx"/>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  import { defineComponent } from 'vue';
  import { IonSkeletonText, IonImg } from '@ionic/vue';
  export default defineComponent({
    name: 'RecipeImageEdit',
    components: { IonSkeletonText, IonImg },
    props: {
      imageUrls: Array,
    },
  })
</script>

<style scoped>
  div.thumbnail {
    float: left;
    position: relative;
    width: 32%;
    height: 0;
    padding-bottom: 32%;
    margin-right: 2%;
  }

  div.thumbnails :nth-child(3n+3) { 
    margin-right: 0; 
  }

  div.thumbnail > ion-img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
</style>