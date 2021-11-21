<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <ion-app>
      <ion-router-outlet />
    </ion-app>
  </n-config-provider>
</template>

<script lang="js">
  import { IonApp, IonRouterOutlet, alertController } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { NConfigProvider } from 'naive-ui';
  import themeOverrides from "@/theme/naive-ui-theme-overrides.json"

  export default defineComponent({
    name: 'App',
    components: {
      IonApp,
      IonRouterOutlet,
      NConfigProvider
    },
    data() {
      return {
        deferredPrompt: null,
        themeOverrides: themeOverrides,
      };
    },
    created() {
      window.addEventListener("beforeinstallprompt", async e => {
        console.log("beforeinstallprompt was emitted")
        e.preventDefault();
        this.deferredPrompt = e;
        await this.presentAlertConfirm();
      });
      window.addEventListener("appinstalled", () => {
        console.log("appinstalled was emitted")
        this.deferredPrompt = null;
      });
    },
    methods: {
      async presentAlertConfirm() {
        const alert = await alertController.create({
          // cssClass: 'my-custom-class',
          header: 'Installiere die App!',
          // message: 'Installiere die App',
          buttons: [
            {
              text: 'Nö',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                console.log('Confirm Cancel:', blah);
                this.deferredPrompt = null;
              },
            },
            {
              text: 'Na gut',
              handler: () => {
                console.log('Confirm Ok:');
                this.deferredPrompt.prompt();
              },
            },
          ],
        });
        return alert.present();
      },
    }
  });
</script>