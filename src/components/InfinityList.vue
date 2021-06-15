<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{title}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{title}}</ion-title>
        </ion-toolbar>
      </ion-header>
      <IonContent>
        <ion-refresher slot="fixed" @ionRefresh="refreshContentList($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>
        <IonGrid fixed>
          <slot
            v-for="elem in shownContentList"
            :id="elem.id"
            :lastUpdate="elem.lastUpdate"
            :key="elem.id"
          ></slot>
          <ion-infinite-scroll
            @ionInfinite="extentContentList($event)" 
            threshold="100px" 
            id="infinite-scroll"
            :disabled="disableInfiniteScroll"
          >
            <ion-infinite-scroll-content
              loading-spinner="bubbles">
            </ion-infinite-scroll-content>
          </ion-infinite-scroll>
        </IonGrid>
      </IonContent>
    
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
  import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent, 
    IonGrid, 
    IonInfiniteScroll, 
    IonInfiniteScrollContent, 
    IonRefresher, 
    IonRefresherContent
  } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { recipeDbApi } from './../axios-common';

  interface UpdateableSlot {
    updateData(): void;
  }

  export default defineComponent({
    name: 'InfinityList',
    components: {
      IonPage,
      IonHeader,
      IonToolbar,
      IonTitle,
      IonContent,
      IonGrid,
      IonInfiniteScroll,
      IonInfiniteScrollContent,
      IonRefresher,
      IonRefresherContent
    },
    props: {
      title: {
        type: String,
        required: true
      },
      apiUrl: {
        type: String,
        required: true
      },
      initialNumShownElems: {
        type: Number,
        default: 5
      },
      disableInfiniteScroll: Boolean,
    },
    data() {
      return {
        contentList: [],
        numShownElems: this.initialNumShownElems
      }
    },
    computed: {
      shownContentList() {
        return this.contentList.slice(0, this.numShownElems);
      }
    },
    mounted() {
      this.updateContentList();
    },
    methods: {
      async updateContentList() {
        console.debug("updateContentList");
        const response = await recipeDbApi.get(this.apiUrl);
        this.contentList = response.data.map((elem: any) => {
          return {
            id: elem.id,
            lastUpdate: elem.updated_at
          }
        });
      },
      async refreshContentList(event: any) {
        console.debug("refreshContentList");
        await this.updateContentList();
        this.numShownElems = this.initialNumShownElems;
        event.target.complete();
      },
      extentContentList(event: any) {
        console.debug("extentContentList");
        if(this.numShownElems + 3 >= this.contentList.length){
          this.numShownElems = this.contentList.length;
          event.target.disabled = true;
        } else {
          this.numShownElems += 3;
        }
        event.target.complete();
      },
    }
  })
</script>