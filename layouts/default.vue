<template>
  <v-app :class="{ 'site-app--home': route.path === '/' }">
    <v-main class="site-main">
      <slot />
    </v-main>

    <footer class="site-footer">
      <div class="footer-details">
        <p class="footer-copyright">© {{ copyrightYear }} The Shop at Teabury</p>
        <p class="footer-location">Oakhurst, NJ</p>
      </div>
      <div class="footer-links">
        <a :href="instagramUrl" aria-label="The Shop at Teabury on Instagram">
          <v-icon icon="mdi-instagram" size="24" aria-hidden="true" />
        </a>
        <a :href="bookingUrl" aria-label="Book on Vagaro">
          <img src="/vegaro.png" alt="" width="24" height="24">
        </a>
      </div>
    </footer>
  </v-app>
</template>

<script setup lang="ts">
const route = useRoute()
const copyrightYear = useState('copyright-year', () => new Date().getFullYear())

const bookingUrl = 'https://www.vagaro.com/theshopatteaburyllc'
const instagramUrl = 'https://www.instagram.com/ro_cuts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
</script>

<style scoped>
.site-main {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.site-footer {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.25rem;
  justify-content: center;
  padding: 0.25rem 1rem 0.75rem;
}

.footer-details {
  font-size: 0.875rem;
  line-height: 1.5;
}

.footer-details p {
  margin: 0;
}

.footer-copyright {
  font-weight: 600;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.footer-links a {
  background-color: rgb(var(--v-theme-secondary));
  border-radius: 50%;
  color: inherit;
  display: grid;
  height: 48px;
  place-items: center;
  text-decoration: none;
  width: 48px;
}

.footer-links a:hover,
.footer-links a:active {
  background-color: color-mix(in srgb, rgb(var(--v-theme-secondary)) 90%, currentColor);
}

.footer-links a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .site-footer {
    flex-direction: column;
    text-align: center;
  }

  .site-app--home :deep(.v-application__wrap) {
    justify-content: center;
  }

  .site-app--home .site-main {
    flex-grow: 0;
  }
}
</style>
