<template>
  <ion-modal
   :is-open="isOpen"
  >
    <ion-page>
      <vue-cropper
        v-if="imageUrl"
        ref="cropper"
        :src="imageUrl"
        alt="Source Image"
        :viewMode=1
        dragMode="move"
        :aspectRatio=1
        :model=false
        :guides=false
        :center=false
        :background=false
        :autoCropArea=1
        :movable=false
        :rotatable=false
        :scalable=false
        :zoomable=false
        :cropBoxResizable=false
      />
      <div class="btns">
        <ion-button color="primary" type=submit @click="cropImage">
          <ion-icon :icon="checkmarkOutline" slot="start"></ion-icon>
          Bild hinzufügen
        </ion-button>
        <ion-button color="secondary" type="reset" @click="$emit('dismissed')">
          <ion-icon :icon="closeOutline" slot="start"></ion-icon>
          Abbrechen
        </ion-button>
      </div>
    </ion-page>

  </ion-modal>
</template>

<script lang="js">
  import { defineComponent } from 'vue';
  import { IonPage, IonModal, IonIcon, IonButton } from '@ionic/vue';
  import { checkmarkOutline, closeOutline } from 'ionicons/icons';
  import VueCropper from 'vue-cropperjs';
  import 'cropperjs/dist/cropper.css';

  export default defineComponent({
    name: 'RecipeImageCropper',
    components: { VueCropper, IonModal, IonPage, IonIcon, IonButton },
    props: {
      imageUrl: String,
      isOpen: Boolean
    },
    emits: ['imageCropped', 'dismissed'],
    setup() {
      return {
        checkmarkOutline,
        closeOutline
      }
    },
    methods: {
      cropImage(){
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toBlob((croppedImageBlob) => {
          this.$emit('imageCropped', croppedImageBlob)
        });
      }
    }
  })
</script>

<style scoped>
  .btns {
    text-align: center;
  }
</style>

<style>
  .cropper-view-box{
    outline-width: 0px;
  }
</style>