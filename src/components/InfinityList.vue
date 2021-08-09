<template>
  <ion-content>
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
        :disabled="infiniteScrollDisabled"
      >
        <ion-infinite-scroll-content
          loading-spinner="bubbles">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
    </IonGrid>
  </ion-content>
</template>

<script lang="ts">
  import {
    IonContent, 
    IonGrid, 
    IonInfiniteScroll, 
    IonInfiniteScrollContent, 
    IonRefresher, 
    IonRefresherContent
  } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { recipeDbApi } from '@/axios-common';

  export default defineComponent({
    name: 'InfinityList',
    components: {
      IonContent,
      IonGrid,
      IonInfiniteScroll,
      IonInfiniteScrollContent,
      IonRefresher,
      IonRefresherContent
    },
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      initialNumShownElems: {
        type: Number,
        default: 5
      },
    },
    data() {
      return {
        contentList: [],
        numShownElems: this.initialNumShownElems,
        infiniteScrollDisabled: false
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
        this.infiniteScrollDisabled = false
        event.target.complete();
      },
      extentContentList(event: any) {
        console.debug("extentContentList");
        if(this.numShownElems + 3 >= this.contentList.length){
          this.numShownElems = this.contentList.length;
          this.infiniteScrollDisabled = true;
        } else {
          this.numShownElems += 3;
        }
        event.target.complete();
      },
    }
  })
</script>