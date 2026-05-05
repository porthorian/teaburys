<template>
  <v-app class="fill-height" style="background-color:#effced">
    <v-container class="d-flex flex-column fill-height">
      <v-main>
        <slot></slot>
      </v-main>
      <v-footer class="position-bottom position-relative w-100 mt-auto rounded-lg max-height-footer">
        <v-row justify="center" no-gutters>
          <v-col class="text-center mt-auto" cols="12">
              {{ new Date().getFullYear() }} — <strong>Teaburys</strong>
          </v-col>
          <v-col class="text-center mt-auto" cols="12">
              <v-btn icon="mdi-instagram" href="https://www.instagram.com/ro_cuts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="></v-btn>
              <v-btn class="rounded-circle" icon="" href="https://www.vagaro.com/theshopatteaburyllc">
                <v-img height="24" width="24" src="/vegaro.png"></v-img>
              </v-btn>
          </v-col>
        </v-row>
      </v-footer>
    </v-container>
  </v-app>
</template>

<style scoped>
.max-height-footer {
  max-height: 80px;
}
</style>