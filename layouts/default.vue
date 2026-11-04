<template>
  <v-app :class="{ 'site-app--home': route.path === '/' }">
    <v-main class="site-main">
      <slot />
    </v-main>

    <footer class="site-footer">
      <img
        v-if="route.path === '/'"
        class="footer-sign"
        src="/the-shop.png"
        alt=""
        width="1066"
        height="674"
      >
      <div class="footer-details">
        <p class="footer-location">Oakhurst, NJ</p>
        <p class="footer-copyright">© {{ copyrightYear }} The Shop at Teabury</p>
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

.site-app--home {
  --home-gutter: clamp(1rem, 4vw, 4rem);
  --home-inset: max(var(--home-gutter), calc((100% - 92rem) / 2 + var(--home-gutter)));
}

.site-app--home .site-footer {
  background-color: color-mix(in srgb, rgb(var(--v-theme-background)) 68%, rgb(var(--v-theme-secondary)));
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  padding: 0.875rem var(--home-inset);
  text-align: left;
}

.site-app--home .footer-details {
  overflow-wrap: anywhere;
}

.site-app--home .footer-links a {
  background-color: transparent;
}

.site-app--home .footer-links a:hover,
.site-app--home .footer-links a:active {
  background-color: rgb(var(--v-theme-secondary));
}

.footer-sign {
  display: block;
  height: auto;
  width: 6.25rem;
}

@media (width > 960px) {
  .site-app--home {
    --home-inset: max(var(--home-gutter), calc((100% - clamp(59rem, 72vw, 68rem)) / 2));
  }
}

@media (720px < width <= 960px) and (orientation: portrait) {
  .site-app--home {
    --home-gutter: clamp(2rem, 14vw, 8rem);
  }
}

@media (max-width: 720px) {
  .site-app--home {
    --home-gutter: max(1rem, 4vw, calc((100% - 30rem) / 2));
  }

  .site-app--home .site-footer {
    background-color: transparent;
    gap: 0.5rem;
    padding-block: 0.75rem calc(0.75rem + env(safe-area-inset-bottom, 0px));
  }

  .site-app--home .footer-links {
    gap: 0;
  }

  .footer-sign {
    width: 3.5rem;
  }
}

@media (max-width: 600px) {
  .site-footer {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 18rem) {
  .site-app--home .site-footer {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .site-app--home .footer-links {
    grid-column: 2;
    justify-self: start;
  }
}
</style>
