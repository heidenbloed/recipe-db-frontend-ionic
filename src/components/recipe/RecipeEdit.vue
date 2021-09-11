<template>
  <PageWithHeader :title="title">
    <template v-slot:toolbar>
      <ion-buttons slot="primary">
        <ion-button>
          <ion-icon slot="icon-only" :icon="saveOutline"/>
        </ion-button>
      </ion-buttons>
    </template>

    <ion-content class="ion-padding">
      <RecipeImageEdit :imageUrls="recipeImageUrls"/>
    </ion-content>
  </PageWithHeader>
</template>

<script lang="js">
  import PageWithHeader from "@/components/PageWithHeader.vue";
  import IconLabel from "@/components/recipe/IconLabel.vue"
  import RecipeImageEdit from "@/components/recipe/RecipeImageEdit.vue"
  import { defineComponent } from 'vue';
  import { IonContent, IonSkeletonText, IonButtons, IonButton, IonIcon } from '@ionic/vue';
  import { saveOutline } from 'ionicons/icons';
  import { getRecipeData } from '@/api/recipeDetails' 

  export default defineComponent({
    name: 'RecipeDetail',
    components: {
      PageWithHeader,
      IonButtons,
      IonButton,
      IonIcon,
      IonContent,
      RecipeImageEdit
    },
    props: {
      id: {
        type: Number,
        required: true
      },
    },
    setup() {
      return {
        saveOutline,
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
          return this.recipeData.images.map((imgData) => {return imgData.imageUrl});
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