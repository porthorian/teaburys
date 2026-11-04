<template>
  <v-dialog v-model="open" :transition="false" :aria-labelledby="titleId" max-width="420">
    <template #activator="slotProps">
      <slot name="activator" v-bind="slotProps" />
    </template>

    <v-card class="contact-card" rounded="lg" variant="flat">
      <div class="contact-heading">
        <h2 :id="titleId">Contact</h2>
        <v-btn aria-label="Close contact" icon="mdi-close" variant="text" @click="open = false" />
      </div>

      <div v-for="method in methods" :key="method.label" class="contact-method">
        <div class="contact-row">
          <component :is="method.href ? 'a' : 'div'" :href="method.href" class="contact-detail">
            <span class="contact-label">{{ method.label }}</span>
            <span class="contact-value">{{ method.value }}</span>
          </component>

          <div class="contact-actions">
            <v-btn
              v-for="action in method.actions"
              :key="action.label"
              :href="action.href"
              color="primary"
              variant="text"
            >
              {{ action.label }}
            </v-btn>
            <v-btn
              :aria-label="copied === method.label ? `Copied ${method.label.toLowerCase()}. Copy again` : `Copy ${method.label.toLowerCase()}`"
              :prepend-icon="copied === method.label ? 'mdi-check' : 'mdi-content-copy'"
              class="contact-copy"
              rounded="pill"
              variant="text"
              @click="copyContact(method)"
            >
              {{ copied === method.label ? 'Copied' : 'Copy' }}
            </v-btn>
          </div>
        </div>

        <p v-if="failed === method.label" class="contact-copy-error">{{ copyError }}</p>
      </div>

      <span class="contact-status visually-hidden" role="status">{{ status }}</span>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'

type ContactMethod = {
  label: 'Phone' | 'Email'
  value: string
  href?: string
  actions?: { label: string; href: string }[]
}

const phone = '609-301-0098'
const phoneLink = `+1${phone.replaceAll('-', '')}`
const email = 'rosaf@teaburys.com'
const methods: ContactMethod[] = [
  {
    label: 'Phone',
    value: phone,
    actions: [
      { label: 'Call', href: `tel:${phoneLink}` },
      { label: 'Text', href: `sms:${phoneLink}` },
    ],
  },
  { label: 'Email', value: email, href: `mailto:${email}` },
]

const titleId = useId()
const open = ref(false)
const copied = ref<ContactMethod['label'] | null>(null)
const failed = ref<ContactMethod['label'] | null>(null)
const copyError = 'Couldn’t copy. Select the text to copy it manually.'
const status = computed(() => copied.value ? `${copied.value} copied.` : failed.value ? copyError : '')
let copyAttempt = 0

watch(open, (isOpen) => {
  if (!isOpen) {
    copyAttempt++
    copied.value = null
    failed.value = null
  }
})

async function copyContact(method: ContactMethod) {
  const attempt = ++copyAttempt
  copied.value = null
  failed.value = null

  try {
    await navigator.clipboard.writeText(method.value)
    if (attempt === copyAttempt) copied.value = method.label
  } catch {
    if (attempt === copyAttempt) failed.value = method.label
  }
}
</script>

<style scoped>
.contact-card {
  box-shadow: none; /* taste-skill-ignore: reset Vuetify's default dialog shadow. */
  display: grid;
  gap: 0.75rem;
  padding: clamp(1.125rem, 4vw, 1.5rem);
}

.contact-heading,
.contact-row {
  align-items: center;
  display: flex;
  gap: 0 0.5rem;
  justify-content: space-between;
}

.contact-heading h2 {
  font-size: 1.625rem;
  line-height: 1.2;
  margin: 0;
}

.contact-row {
  flex-wrap: wrap;
}

.contact-detail {
  display: grid;
  min-width: 0;
  overflow-wrap: anywhere;
}

.contact-label {
  color: rgb(var(--v-theme-on-surface));
  font-size: 0.875rem;
  line-height: 1.3;
}

.contact-value {
  font-weight: 600;
}

a.contact-detail {
  align-content: center;
  color: rgb(var(--v-theme-primary));
  min-height: 48px;
  text-decoration: none;
}

a.contact-detail .contact-value {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.25rem;
}

.contact-card .v-btn {
  flex: none;
  font-weight: 600;
  letter-spacing: normal;
  min-height: 48px;
  min-width: 48px;
  padding-inline: 0.5rem;
  text-transform: none;
}

.contact-card .contact-copy {
  width: 6rem;
}

.contact-copy-error {
  color: rgb(var(--v-theme-primary));
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
}

.visually-hidden {
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
}

.contact-card .v-btn:focus-visible,
.contact-detail:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

@media (max-width: 720px) {
  .contact-card .contact-copy,
  .contact-copy-error {
    display: none;
  }
}
</style>
