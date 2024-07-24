<template>
  <v-app class="fill-height" style="background-color:#ede9cc">
    <v-container class="fill-height">
      <slot></slot>
      <v-footer class="position-bottom position-relative w-100 mt-auto rounded-lg">
        <v-row justify="center" no-gutters>
          <v-col class="text-center mt-auto" cols="12">
              {{ new Date().getFullYear() }} — <strong>Teaburys</strong>
          </v-col>
        </v-row>
      </v-footer>
    </v-container>
  </v-app>
</template>