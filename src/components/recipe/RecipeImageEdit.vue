<template>
  <div class="ion-padding-bottom">
    <ion-skeleton-text v-if="!images" animated  style="height: 100px"/>

    <div class="thumbnails" v-if="images">
      <draggable 
        v-model="sortedImages"
        item-key="id"
        direction="horizontal"
        tag="transition-group"
        fallbackTolerance=3
        delay=100
        @update="imageOrderUpdated">
        <template #item="{element}">
          <div class="thumbnail">
            <img :src="element.imageUrl" :alt="'Foto ' + element.id" @contextmenu.prevent/>

            <div class="remove-img-btn">
              <ion-buttons>
                <ion-button color="danger" @click="removeImage(element.id)">
                  <ion-icon slot="icon-only" :icon="closeCircle" />
                </ion-button>
              </ion-buttons>
            </div>
          </div>
        </template>

        <template #footer>
          <div class="thumbnail" key="footer">
            <div class="add-img-btn">
              <label for="file-upload" class="custom-file-upload">
                <ion-icon :icon="addCircle" color="primary" size="large"/>
              </label>
              <input id="file-upload" type="file" accept="image/*" @change="openImageCropperModal"/>
            </div>
          </div>
        </template>
      </draggable>
    </div>

    <RecipeImageCropper
     :isOpen="imageCropperModalIsOpen"
     :imageUrl="imageCropperUrl"
     @imageCropped="previewAndAddCroppedImage"
     @dismissed="imageCropperModalIsOpen=false"
    />

  </div>
</template>

<script lang="js">
  import { defineComponent } from 'vue';
  import { IonSkeletonText, IonButton, IonButtons, IonIcon, toastController } from '@ionic/vue';
  import { closeCircle, addCircle } from 'ionicons/icons';
  import draggable from 'vuedraggable';
  import RecipeImageCropper from '@/components/recipe/RecipeImageCropper';

  export default defineComponent({
    name: 'RecipeImageEdit',
    components: { IonSkeletonText, IonButton, IonButtons, IonIcon, draggable, RecipeImageCropper },
    props: {
      images: Array,
    },
    emits: ['update:imageOrder', 'update:addedImages', 'update:removedImages'],
    setup() {
      return {
        closeCircle,
        addCircle,
      }
    },
    data() {
      return {
        sortedImages: [],
        addedImages: {},
        removedImages: [],
        imageCropperModalIsOpen: false,
        imageCropperUrl: null,
      }
    },
    watch: {
      images(newImages) {
        if(newImages) {
          this.sortedImages = [...newImages].sort((elemA, elemB) => {return elemA.order - elemB.order });
        }
      },
    },
    methods: {
      openImageCropperModal(event) {
        const file = event.target.files[0];
        this.imageCropperUrl = URL.createObjectURL(file);
        this.imageCropperModalIsOpen = true;
      },
      previewAndAddCroppedImage(croppedImageBlob){
        this.imageCropperModalIsOpen=false;
        console.log("add cropped image", croppedImageBlob);
        const url = URL.createObjectURL(croppedImageBlob);
        const newId = "new" + Object.keys(this.addedImages).length;
        this.addedImages[newId] = croppedImageBlob;
        this.sortedImages.push({id: newId, imageUrl: url});
        this.addedImagesUpdated();
        this.imageOrderUpdated();
      },
      async removeImage(imageId) {
        const removedImageIdx = this.sortedImages.findIndex((elem) => {return elem.id === imageId});
        const removedImage = this.sortedImages.splice(removedImageIdx, 1)[0];

        const toast = await toastController.create({
          message: 'Foto wurde gelöscht',
          position: 'bottom',
          duration: 2000,
          buttons: [
            {
              text: 'Rückgängig',
              role: 'undo',
            }
          ]
        })
        await toast.present()
        const { role } = await toast.onDidDismiss();

        if (role == 'undo'){
          this.sortedImages.splice(removedImageIdx, 0, removedImage)
        } else {
          
          if (typeof removedImage.id === 'string' || removedImage.id instanceof String) {
            if (removedImage.id.startsWith("new")){
              delete this.addedImages[removedImage.id];
              this.addedImagesUpdated();
            }
          } else {
            this.removedImages.push(removedImage.id);
            this.removedImagesUpdated();
          }
          this.imageOrderUpdated();
        }        
      },
      imageOrderUpdated() {
        this.$emit('update:imageOrder', this.sortedImages.map((elem) => {return elem.id}));
      },
      addedImagesUpdated() {
        this.$emit('update:addedImages', this.addedImages);
      },
      removedImagesUpdated() {
        this.$emit('update:removedImages', this.removedImages);
      },
    }
  })
</script>

<style scoped>
  .thumbnails {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-flow: row wrap;
  }

  .thumbnails :nth-child(3n+3) { 
    margin-right: 0; 
  }

  .thumbnail {
    float: left;
    position: relative;
    width: 32%;
    height: 0;
    padding-bottom: 32%;
    margin-right: 2%;
    margin-bottom: 2%;
    border:2px solid var(--ion-color-dark);
  }

  .thumbnail > img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    
  }

  .remove-img-btn {
    position: absolute;
    top: 20%;
    left: 80%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }

  .add-img-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
  }

  .add-img-btn input{
    display: none;
  }

  .add-img-btn label{
    cursor: pointer;
  }
</style>