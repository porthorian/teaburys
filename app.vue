<template>
  <NuxtLayout>
    <v-app>
      <v-container>
        <NuxtPage />
        <v-footer>
          <v-row justify="center" no-gutters>
            <v-col class="text-center mt-4" cols="12">
              {{ new Date().getFullYear() }} — <strong>Teaburys</strong>
            </v-col>
          </v-row>
        </v-footer>
      </v-container>
    </v-app>
  </NuxtLayout>
</template>
