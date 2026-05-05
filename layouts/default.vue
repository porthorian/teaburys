<template>
  <v-app class="site-app">
    <v-main class="site-main">
      <slot />
    </v-main>

    <v-footer class="site-footer">
      <v-container class="footer-container">
        <div class="footer-brand">
          <strong>The Shop at Teabury</strong>
          <span>{{ new Date().getFullYear() }} — Oakhurst, NJ</span>
        </div>

        <div class="footer-actions">
          <v-btn
            :href="instagramUrl"
            aria-label="@ro_cuts on Instagram"
            color="accent"
            icon="mdi-instagram"
            rounded="lg"
            variant="text"
          />
          <v-btn
            :href="bookingUrl"
            aria-label="Book on Vagaro"
            class="vagaro-button"
            color="accent"
            rounded="lg"
            variant="text"
          >
            <v-img height="24" src="/vegaro.png" width="24" />
          </v-btn>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
const bookingUrl = 'https://www.vagaro.com/theshopatteaburyllc'
const instagramUrl = 'https://www.instagram.com/ro_cuts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
</script>

<style scoped>
.site-app {
  background: #101111;
  color: #f8efe8;
  min-height: 100vh;
}

.site-main {
  min-height: 100vh;
}

.site-footer {
  background: #0c0d0d;
  border-top: 1px solid rgba(242, 215, 201, 0.12);
  color: rgba(248, 239, 232, 0.7);
  padding: 0;
}

.footer-container {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  max-width: 1180px;
  min-height: 86px;
}

.footer-brand {
  display: grid;
  gap: 0.2rem;
}

.footer-brand strong {
  color: #fff8f2;
}

.footer-brand span {
  font-size: 0.92rem;
}

.footer-actions {
  align-items: center;
  display: flex;
  gap: 0.45rem;
}

.vagaro-button {
  min-width: 48px;
}

@media (max-width: 600px) {
  .footer-container {
    align-items: flex-start;
    flex-direction: column;
    min-height: auto;
    padding-bottom: 1.1rem;
    padding-top: 1.1rem;
  }
}
</style>
