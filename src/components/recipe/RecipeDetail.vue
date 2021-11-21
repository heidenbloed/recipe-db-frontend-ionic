<template>
  <PageWithHeader :title="title">
    <template v-slot:toolbar>
      <ion-buttons slot="primary">
        <ion-button @click="$router.push('edit')">
          <ion-icon slot="icon-only" :icon="pencilOutline"/>
        </ion-button>
      </ion-buttons>
    </template>

    <ion-content class="ion-padding">
      <RecipeImageSlides :imageUrls="recipeImageUrls"/>

      <PrepTimeLabel :prepTime="recipeData.prepTime"></PrepTimeLabel>
      <IconLabel :icon="bookOutline" :loaded="recipeData.source !== undefined">
        {{recipeData.source}}
      </IconLabel>

      <p class="section">Zutaten</p>
      <ion-skeleton-text v-if="!recipeData.ingredients" animated/>
      <div v-for="ingr in recipeData.ingredients" :key="ingr.id">
        {{ingr.quantity}} {{ingr.unit}} {{ingr.name}}
      </div>

      <p class="section">Schlagwörter</p>
      <ion-skeleton-text v-if="!recipeData.labels" animated/>
      <n-space>
        <RecipeLabelBadge v-for="label in recipeData.labels" :key="label.id" :category="label.category">
          {{label.name}}
        </RecipeLabelBadge>
      </n-space>
    </ion-content>
  </PageWithHeader>
</template>

<script lang="js">
  import PageWithHeader from "@/components/PageWithHeader.vue";
  import PrepTimeLabel from "@/components/recipe/PrepTimeLabel.vue"
  import IconLabel from "@/components/recipe/IconLabel.vue"
  import RecipeLabelBadge from "@/components/recipe/RecipeLabelBadge.vue"
  import RecipeImageSlides from "@/components/recipe/RecipeImageSlides.vue"
  import { defineComponent } from 'vue';
  import { IonContent, IonSkeletonText, IonButtons, IonButton, IonIcon } from '@ionic/vue';
  import {
    NSpace
  } from 'naive-ui';
  import { bookOutline, pencilOutline } from 'ionicons/icons';
  import { getRecipeData } from '@/api/recipeDetails';


  export default defineComponent({
    name: 'RecipeDetail',
    components: {
      PageWithHeader,
      IonButtons,
      IonButton,
      IonIcon,
      IonContent,
      PrepTimeLabel,
      IconLabel,
      IonSkeletonText,
      RecipeLabelBadge,
      RecipeImageSlides,
      NSpace
    },
    props: {
      id: {
        type: Number,
        required: true
      },
    },
    setup() {
      return {
        bookOutline,
        pencilOutline,
      }
    },
    data() {
      return {
        recipeData: {},
      }
    },
    computed: {
      title() {
        return this.recipeData.name
      },
      recipeImageUrls() {
        if (this.recipeData.images) {
          const sortedImages = [...this.recipeData.images].sort((elemA, elemB) => {return elemA.order - elemB.order });
          return sortedImages.map((imgData) => {return imgData.imageUrl});
        } else {
          return undefined;
        }
      },
    },
    async mounted() {
      this.recipeData = await getRecipeData(this.id);
    },
  })
</script>

<style scoped>
  p.section {
    font-size: large;
    font-weight: bold;
    margin-bottom: 0.1em;
  }
</style>