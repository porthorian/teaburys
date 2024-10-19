<template>
  <v-app class="fill-height" style="background-color:#ede9cc">
    <v-container class="fill-height">
      <slot></slot>
      <v-footer class="position-bottom position-relative w-100 mt-auto rounded-lg">
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