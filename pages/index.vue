<template>
  <div class="home-page fill-height">
    <section class="hero-section fill-height">
      <v-container class="hero-container">
        <div class="hero-content">
          <v-alert
            v-if="showAnnouncement"
            class="announcement-alert"
            icon="mdi-bullhorn"
            role="status"
            rounded="lg"
            variant="flat"
          >
            <div class="announcement-content">
              <div>
                <div
                  v-if="announcement.title"
                  class="announcement-title"
                >
                  {{ announcement.title }}
                </div>
                <div class="announcement-message">
                  {{ announcement.message }}
                </div>
              </div>

              <div class="announcement-actions">
                <v-btn
                  v-if="announcement.actionLabel && announcement.actionUrl"
                  :href="announcement.actionUrl"
                  class="announcement-action"
                  color="primary"
                  rounded="lg"
                  size="small"
                  variant="flat"
                >
                  {{ announcement.actionLabel }}
                </v-btn>

                <v-btn
                  aria-label="Dismiss announcement"
                  color="accent"
                  icon="mdi-close"
                  rounded="lg"
                  size="small"
                  variant="text"
                  @click="announcementDismissed = true"
                />
              </div>
            </div>
          </v-alert>

          <div class="sign-panel">
            <v-img
              alt="The Shop at Teabury"
              aspect-ratio="1066/674"
              class="shop-mark"
              eager
              src="/the-shop.png"
            />
          </div>

          <div class="hero-actions">
            <v-btn
              :href="bookingUrl"
              append-icon="mdi-arrow-right"
              prepend-icon="mdi-calendar-check"
              class="hero-button"
              color="primary"
              rounded="lg"
              size="large"
            >
              Book Now
            </v-btn>

            <v-btn
              class="hero-button"
              color="accent"
              prepend-icon="mdi-phone"
              rounded="lg"
              size="large"
              variant="outlined"
              @click="contactDialog = true"
            >
              Contact
            </v-btn>
          </div>
        </div>
      </v-container>
    </section>

    <v-dialog v-model="contactDialog" max-width="520px">
      <v-card class="contact-card" rounded="lg">
        <v-card-title class="contact-title">Contact</v-card-title>
        <v-card-text>
          <div class="contact-list">
            <UseClipboard v-slot="{ copy, copied }" :source="phone">
              <v-btn
                :aria-label="phone"
                block
                class="contact-option"
                color="surface"
                size="large"
                variant="flat"
                @click="copy()"
              >
                <template #prepend>
                  <v-icon>mdi-chat</v-icon>
                  <strong class="button-slash">/</strong>
                  <v-icon>mdi-phone</v-icon>
                </template>
                {{ copied ? 'Copied' : phone }}
              </v-btn>
            </UseClipboard>

            <UseClipboard v-slot="{ copy, copied }" :source="email">
              <v-btn
                :aria-label="email"
                block
                class="contact-option"
                color="surface"
                prepend-icon="mdi-email"
                size="large"
                variant="flat"
                @click="copy()"
              >
                {{ copied ? 'Copied' : email }}
              </v-btn>
            </UseClipboard>

            <v-btn
              :href="instagramUrl"
              aria-label="@ro_cuts"
              block
              class="contact-option"
              color="surface"
              prepend-icon="mdi-instagram"
              size="large"
              variant="flat"
            >
              @ro_cuts
            </v-btn>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="accent" variant="text" @click="contactDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { UseClipboard } from '@vueuse/components'
import { computed, ref } from 'vue'

const config = useRuntimeConfig()

const bookingUrl = 'https://www.vagaro.com/theshopatteaburyllc'
const instagramUrl = 'https://www.instagram.com/ro_cuts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
const phone = '609-301-0098'
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
  background:
    radial-gradient(circle at 50% 42%, rgba(217, 74, 67, 0.12), transparent 30rem),
    linear-gradient(180deg, #111313 0%, #151716 54%, #101111 100%);
  color: #f8efe8;
  display: flex;
  min-height: 100%;
}

.hero-section {
  align-items: center;
  display: flex;
  flex: 1;
  overflow: hidden;
  padding: clamp(2.75rem, 7vw, 5.5rem) 0;
}

.hero-container {
  max-width: 920px;
}

.hero-content {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-inline: auto;
  max-width: 820px;
}

.announcement-alert {
  background:
    linear-gradient(135deg, rgba(217, 74, 67, 0.18), rgba(24, 26, 24, 0.94)),
    #181a18;
  border: 1px solid rgba(242, 215, 201, 0.16);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28);
  color: #fff8f2;
  margin-bottom: 1.25rem;
  width: 100%;
}

.announcement-content {
  align-items: center;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
}

.announcement-title {
  color: #fff8f2;
  font-size: 0.95rem;
  font-weight: 800;
  line-height: 1.25;
}

.announcement-message {
  color: rgba(248, 239, 232, 0.78);
  font-size: 0.92rem;
  line-height: 1.45;
}

.announcement-actions {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  gap: 0.35rem;
}

.announcement-action {
  min-width: 88px;
}

.hero-actions {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-top: 1.35rem;
}

.hero-button {
  min-height: 50px;
  min-width: 138px;
}

.sign-panel {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.62), rgba(242, 215, 201, 0.2)),
    #ead7c5;
  border: 1px solid rgba(255, 248, 242, 0.54);
  border-radius: 18px;
  box-shadow:
    0 26px 58px rgba(0, 0, 0, 0.38),
    inset 0 0 0 1px rgba(16, 17, 17, 0.08);
  margin-inline: auto;
  max-width: 760px;
  overflow: hidden;
  padding: clamp(1rem, 3vw, 1.65rem);
  width: 100%;
}

.shop-mark {
  filter: drop-shadow(0 16px 24px rgba(16, 17, 17, 0.22));
  margin: auto;
  width: 100%;
}

.contact-card {
  background: #181a18;
  border: 1px solid rgba(242, 215, 201, 0.14);
}

.contact-title {
  color: #fff8f2;
  font-weight: 800;
  padding: 1.25rem 1.25rem 0.25rem;
}

.contact-list {
  display: grid;
  gap: 0.75rem;
}

.contact-option {
  justify-content: flex-start;
  min-height: 52px;
}

.button-slash {
  color: rgba(248, 239, 232, 0.44);
  margin: 0 0.2rem;
  font-weight: 800;
  font-size: 25px;
}

@media (max-width: 959px) {
  .sign-panel {
    max-width: 680px;
  }
}

@media (max-width: 600px) {
  .hero-section {
    padding: 2rem 0 2rem;
  }

  .announcement-content {
    align-items: stretch;
    flex-direction: column;
  }

  .announcement-actions {
    justify-content: space-between;
  }

  .hero-button {
    flex: 1 1 100%;
  }
}
</style>
