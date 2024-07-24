<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <NuxtLayout name="default">
    <div class="mx-auto text-center">
      <v-img 
        aspect-ratio="1/1" cover src="/the-shop.png"
        max-height="450" max-width="450"
        class="mx-auto"></v-img>
        <div class="rounded-lg pa-6">
        <h1 class="text-h1 text-surface">{{ error.statusCode }}</h1>
        <h5 class="text-h5 mb-3 text-surface">{{ error.statusMessage }}</h5>
        <v-btn to="/">Go back home</v-btn>
      </div>
    </div>
  </NuxtLayout>
</template>
