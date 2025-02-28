<template>
  <v-main>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="d-flex align-center">
          <div class="mx-auto text-center w-100">
            <v-img 
              aspect-ratio="1/1" cover src="/the-shop.png"
               max-height="750" max-width="750"
               class="mx-auto"></v-img>
            <v-row clas="mt-2">
              <v-btn class="mx-auto" href="https://www.vagaro.com/theshopatteaburyllc">Book Now</v-btn>
            </v-row>
            <v-row class="mt-7">
              <v-dialog max-width="500px">
                <template v-slot:activator="{ props: activatorProps}">
                  <v-btn
                    v-bind="activatorProps"
                    text="Contact Me"
                    variant="flat"
                    class="mx-auto"
                  ></v-btn>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card title="Contact">
                    <v-card-item>
                      <UseClipboard v-slot="{ copy, copied }" source="609-301-0098">
                        <v-btn
                          aria-label="609-301-0098"
                          prepend-icon="mdi-chat"
                          size="large"
                          @click="copy()"
                        >
                        <template v-slot:prepend>
                          <v-icon>mdi-chat</v-icon><strong>/</strong><v-icon>mdi-phone</v-icon>
                        </template>
                        
                        <span style="font-size: 1.2rem">{{ copied ? 'Copied' : '609-301-0098' }}</span>
                        </v-btn>
                      </UseClipboard>
                    </v-card-item>
                    <v-card-item>
                      <UseClipboard v-slot="{ copy, copied }" source="rosaf@teaburys.com">
                        <v-btn
                          aria-label="rosaf@teaburys.com"
                          prepend-icon="mdi-email"
                          size="large"
                          @click="copy()"
                        >
                        {{ copied ? 'Copied' : 'rosaf@teaburys.com' }}
                        </v-btn>
                      </UseClipboard>
                    </v-card-item>
                    <v-card-item class="mb-4">
                      <v-btn
                        aria-label="@ro_cuts"
                        size="large"
                        prepend-icon="mdi-instagram"
                        href="https://www.instagram.com/ro_cuts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                        >
                        @ro_cuts
                      </v-btn>
                    </v-card-item>
                  </v-card>
                </template>
              </v-dialog>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { UseClipboard } from '@vueuse/components'
</script>