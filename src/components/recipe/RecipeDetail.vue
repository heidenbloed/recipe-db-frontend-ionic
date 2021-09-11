<template>
  <PageWithHeader :title="title">
    <ion-content class="ion-padding">
      <PrepTimeLabel :prepTime="recipeData.prepTime"></PrepTimeLabel>
      <IconLabel :icon="bookOutline" :loaded="recipeData.source !== undefined">
        {{recipeData.source}}
      </IconLabel>
      <p>{{recipeData}}</p>
    </ion-content>
  </PageWithHeader>
</template>

<script lang="js">
  import PageWithHeader from "@/components/PageWithHeader.vue";
  import PrepTimeLabel from "@/components/recipe/PrepTimeLabel.vue"
  import IconLabel from "@/components/recipe/IconLabel.vue"
  import { defineComponent } from 'vue';
  import { IonContent } from '@ionic/vue';
  import { bookOutline } from 'ionicons/icons';
  import { getRecipeData } from '@/api/recipeDetails' 
  export default defineComponent({
    name: 'RecipeDetail',
    components: { PageWithHeader, IonContent, PrepTimeLabel, IconLabel },
    props: {
      id: {
        type: Number,
        required: true
      },
    },
    setup() {
      return {
        bookOutline
      }
    },
    data() {
      return {
        recipeData: {},
      }
    },
    computed: {
      title(): string {
        return this.recipeData.name
      }
    },
    async mounted() {
      this.recipeData = await getRecipeData(this.id);
    },
  })
</script>