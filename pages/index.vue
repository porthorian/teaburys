<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="d-flex align-center">
          <div class="mx-auto text-center w-100">
            <v-img 
              aspect-ratio="1/1" cover src="/the-shop.png"
               max-height="450" max-width="450"
               class="mx-auto"></v-img>
            <v-row class="mt-2">
              <v-btn class="mx-auto" href="https://www.vagaro.com/theshopatteaburyllc/book-now">Book Now</v-btn>
            </v-row>
            <v-row class="mt-5">
              <v-btn
                class="mx-auto"
                prepend-icon="mdi-instagram"
                href="https://www.instagram.com/ro_cuts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              >@ro_cuts</v-btn>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
</script>