<template>
  <div class="home-page">
    <v-alert
      v-if="showAnnouncement"
      class="announcement"
      color="secondary"
      rounded="sm"
      variant="flat"
    >
      <div class="announcement-content">
        <div role="status">
          <strong v-if="announcement.title" class="announcement-title">
            {{ announcement.title }}
          </strong>
          <p>{{ announcement.message }}</p>
        </div>

        <div class="announcement-actions">
          <v-btn
            v-if="announcement.actionLabel && announcement.actionUrl"
            :href="announcement.actionUrl"
            color="primary"
            rounded="sm"
            variant="flat"
          >
            {{ announcement.actionLabel }}
          </v-btn>
          <v-btn
            aria-label="Dismiss announcement"
            icon="mdi-close"
            rounded="sm"
            variant="text"
            @click="announcementDismissed = true"
          />
        </div>
      </div>
    </v-alert>

    <div class="poster">
      <h1 class="poster-title"><span>The Shop</span> <span>at Teabury</span></h1>
      <p class="poster-tagline">Cut, shave, style &amp; shape</p>

      <img class="poster-rose" src="/shop-rose.svg" alt="" width="608" height="400">

      <div class="hero-actions">
        <v-btn
          :href="bookingUrl"
          class="hero-button hero-booking"
          color="primary"
          rounded="pill"
          variant="flat"
        >
          Book Now
          <template #append>
            <span class="booking-scissors" aria-hidden="true"></span>
          </template>
        </v-btn>

        <ContactDialog>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              class="hero-button"
              color="secondary"
              rounded="pill"
              variant="flat"
            >
              Contact
            </v-btn>
          </template>
        </ContactDialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ContactDialog from '~/components/ContactDialog.vue'

const config = useRuntimeConfig()

const bookingUrl = 'https://www.vagaro.com/theshopatteaburyllc'
const announcementDismissed = ref(false)
const isProduction = import.meta.env.PROD

const isoTimestampPattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/

const announcement = computed(() => ({
  title: config.public.announcementTitle.trim(),
  message: config.public.announcementMessage.trim(),
  expiresAt: config.public.announcementExpiresAt.trim(),
  actionLabel: config.public.announcementActionLabel.trim(),
  actionUrl: config.public.announcementActionUrl.trim(),
}))

const announcementExpiresAt = computed(() => {
  if (!isoTimestampPattern.test(announcement.value.expiresAt)) {
    return null
  }

  const timestamp = Date.parse(announcement.value.expiresAt)

  return Number.isNaN(timestamp) ? null : timestamp
})

const showAnnouncement = computed(() => {
  const expiresAt = announcementExpiresAt.value

  return Boolean(
    isProduction &&
    !announcementDismissed.value &&
    announcement.value.message &&
    expiresAt !== null &&
    Date.now() < expiresAt,
  )
})
</script>

<style scoped>
.home-page {
  align-content: center;
  display: grid;
  padding: clamp(1.5rem, 5svh, 4rem) var(--home-inset);
}

.poster {
  align-items: start;
  display: grid;
  gap: clamp(1rem, 2vw, 1.75rem) clamp(1.5rem, 3vw, 2.75rem);
  grid-template:
    "title artwork"
    "tagline artwork"
    "actions artwork" / max-content minmax(0, min(26rem, 86svh));
  justify-content: center;
}

.poster-title {
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(3rem, min(9.6vw, 24svh), 9.25rem);
  font-weight: 850;
  grid-area: title;
  letter-spacing: -0.055em;
  line-height: 0.92;
  margin: 0;
}

.poster-title span {
  display: block;
}

.poster-title span:last-child {
  font-size: 0.78em;
  letter-spacing: -0.045em;
  margin-top: 0.09em;
}

.poster-tagline {
  font-family: Georgia, serif;
  font-size: clamp(1.125rem, 2vw, 1.625rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.3;
  grid-area: tagline;
  margin: 0;
}

.poster-rose {
  align-self: center;
  display: block;
  grid-area: artwork;
  height: auto;
  width: 100%;
}

.hero-actions,
.announcement-actions {
  display: flex;
  gap: 0.75rem;
}

.hero-button,
.announcement .v-btn {
  box-shadow: none; /* taste-skill-ignore: reset Vuetify’s zero-size shadow. */
  letter-spacing: normal;
  min-height: 48px;
  text-transform: none;
}

.hero-button {
  font-size: 1rem;
  font-weight: 600;
  min-height: 52px;
  min-width: 7.25rem;
}

.hero-actions {
  align-items: center;
  flex-wrap: wrap;
  grid-area: actions;
}

.hero-booking {
  min-height: 60px;
  min-width: 10rem;
}

.booking-scissors {
  aspect-ratio: 170 / 74;
  background-color: currentColor;
  display: block;
  mask: url('/shop-scissors.svg') center / contain no-repeat;
  width: 2.25rem;
}

.announcement {
  margin-bottom: 1rem;
  width: 100%;
}

.announcement-content {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  justify-content: space-between;
  overflow-wrap: anywhere;
}

.announcement-title {
  display: block;
  margin-bottom: 0.25rem;
}

.announcement p {
  margin: 0;
}

.announcement-actions {
  align-items: center;
  flex-wrap: wrap;
  max-width: 100%;
}

.announcement-actions .v-btn {
  height: auto;
  max-width: 100%;
  min-width: 48px;
  white-space: normal;
}

.hero-button:focus-visible,
.announcement .v-btn:focus-visible {
  outline: 2px solid rgb(var(--v-theme-on-background));
  outline-offset: 3px;
}

@media (min-width: 1000px) {
  .hero-button {
    min-width: 10rem;
  }

  .hero-booking {
    min-width: 13rem;
  }
}

@media (max-width: 720px), (max-width: 960px) and (orientation: portrait) {
  .poster {
    gap: clamp(0.75rem, 2.4vw, 1.75rem);
  }

  .poster-rose {
    justify-self: end;
  }
}

@media (720px < width <= 960px) and (orientation: portrait) {
  .poster {
    grid-template:
      "title title"
      "tagline artwork" auto
      "actions artwork" 1fr / minmax(18rem, 1.25fr) minmax(0, 1fr);
  }

  .poster-title {
    font-size: clamp(5.5rem, 13vw, 7rem);
  }

  .poster-rose {
    width: min(100%, 16rem, 52svh);
  }
}

@media (max-width: 720px) {
  .home-page {
    padding-block: clamp(1.25rem, 5svh, 2.75rem) 1rem;
  }

  .poster-title {
    font-size: clamp(3.25rem, 16.5vw, 6.5rem);
  }

  .poster {
    grid-template:
      "title title"
      "tagline artwork"
      "actions actions" / minmax(0, 1.12fr) minmax(0, 1fr);
  }

  .poster-tagline {
    align-self: center;
    text-wrap: balance;
  }

  .poster-rose {
    width: min(100%, 11rem, 52svh);
  }

  .hero-actions {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-button {
    min-width: 0;
  }
}
</style>
