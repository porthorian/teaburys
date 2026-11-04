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

    <h1 class="shop-sign">
      <img
        src="/the-shop.png"
        alt="The Shop at Teabury, barbershop in Oakhurst, NJ"
        width="1066"
        height="674"
      >
    </h1>

    <div class="hero-actions">
      <v-btn
        :href="bookingUrl"
        append-icon="mdi-arrow-right"
        class="hero-button hero-booking"
        color="primary"
        rounded="pill"
        variant="flat"
      >
        Book Now
      </v-btn>

      <v-dialog
        v-model="contactDialog"
        :transition="false"
        aria-labelledby="contact-title"
        max-width="400"
      >
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

        <v-card class="contact-card" rounded="sm" variant="flat">
          <div class="contact-content">
            <h2 id="contact-title">Contact</h2>
            <p>{{ phone }}</p>
            <div class="contact-actions">
              <v-btn :href="`tel:${phoneLink}`" color="secondary" rounded="pill" variant="flat">
                Call
              </v-btn>
              <v-btn :href="`sms:${phoneLink}`" color="secondary" rounded="pill" variant="flat">
                Text
              </v-btn>
            </div>

            <a class="contact-email" :href="`mailto:${email}`">{{ email }}</a>

            <v-btn class="contact-close" rounded="sm" variant="text" @click="contactDialog = false">
              Close
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const config = useRuntimeConfig()

const bookingUrl = 'https://www.vagaro.com/theshopatteaburyllc'
const phone = '609-301-0098'
const phoneLink = `+1${phone.replaceAll('-', '')}`
const email = 'rosaf@teaburys.com'
const contactDialog = ref(false)
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
  grid-template-columns: minmax(0, 52rem);
  justify-content: center;
  justify-items: center;
  padding: clamp(1.5rem, 5svh, 3rem) clamp(1rem, 4vw, 2rem);
}

.shop-sign {
  margin: 0;
  width: min(100%, 100svh);
}

.shop-sign img {
  display: block;
  height: auto;
  width: 100%;
}

.hero-actions,
.contact-actions,
.announcement-actions {
  display: flex;
  gap: 0.75rem;
}

.hero-button,
.contact-card .v-btn,
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
  min-width: 10rem;
}

.hero-actions {
  align-items: center;
}

.hero-booking {
  font-size: 1.125rem;
  min-height: 60px;
  min-width: 13rem;
  padding-inline: 1.5rem;
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

.announcement p,
.contact-card h2,
.contact-card p {
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

.contact-card {
  box-shadow: none; /* taste-skill-ignore: reset Vuetify’s dialog shadow. */
}

.contact-content {
  align-items: start;
  display: grid;
  gap: 0.5rem;
  padding: 1.5rem;
}

.contact-card h2 {
  font-size: 1.5rem;
  line-height: 1.25;
}

.contact-actions {
  margin-bottom: 0.5rem;
}

.contact-email {
  align-content: center;
  color: rgb(var(--v-theme-primary));
  justify-self: start;
  min-height: 48px;
  overflow-wrap: anywhere;
  text-underline-offset: 0.2em;
}

.contact-close {
  justify-self: end;
}

.hero-button:focus-visible,
.contact-card .v-btn:focus-visible,
.announcement .v-btn:focus-visible,
.contact-email:focus-visible {
  outline: 2px solid rgb(var(--v-theme-on-background));
  outline-offset: 3px;
}

@media (max-width: 600px) {
  .home-page {
    padding-bottom: 1.25rem;
  }

  .hero-actions {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    width: min(100%, 20rem);
  }

  .hero-button {
    min-width: 0;
  }
}
</style>
