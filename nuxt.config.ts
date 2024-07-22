import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

const description: string = `The Shop at Teabury, located in Oakhurst, NJ is your little friendly neighborhood barbershop. 
We specialize in a wide variety of barbering and hair styling services tailored to men, women, and children. 
Whether you're looking for a classic cut or something more trendy, we are here to help you achieve the perfect style.`

export default defineNuxtConfig({
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  app: {
    head: {
        title: 'The Shop at Teabury',
        meta: [
            { name: 'keywords', content: 'Barbershop, Ocean, Oakhurst, New Jersey, NJ, Monmouth County, Fade, Shape Up, Beard Trim, Mens Barbershop, Children Barbershop'},
            { name: 'description', content: description },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover' },
            { 'http-equiv': 'Content-Type', content: 'text/html;charset=UTF-8' },
            { 'http-equiv': 'Content-Language', content: 'en-US' },
            // OpenGraph
            { name: 'og:url', content: 'https://theshop.teaburys.com' },
            { name: 'og:type', content: 'website' },
            { name: 'og:title', content: 'The Shop at Teabury Barbershop - Cut, Shave, Style & Shape' },
            { name: 'og:description', content: description },
            { name: 'og:site_name', content: 'The Shop at Teabury' },
            { name: 'og:image', content: 'https://theshop.teaburys/the-shop.png' },
            { name: 'og:image:alt', content: 'The Shop' },
            // Twitter
            // { name: 'twitter:card', content: 'summary_large_image' },
            // { name: 'twitter:site', content: '@Porthorian' },
            // { name: 'twitter:creator', content: '@Porthorian' },
            // { name: 'twitter:title', content: card_title },
            // { name: 'twitter:description', content: description },
            // { name: 'twitter:image', content: 'https://teaburys.com/the-shop.png' },
            // { name: 'twitter:image:alt', content: 'Friday Code Release Twitter' }
        ],
        link: [
            { rel: 'icon', href: '/favicon.ico' },
            { rel: 'icon', href: '/favicon-16x16.png', sizes: '16x16' },
            { rel: 'icon', href: '/favicon-32x32.png', sizes: '32x32' },
            { rel: 'shortcut icon', href: '/android-chrome-192x192.png', sizes: '192x192' },
            { rel: 'shortcut icon', href: '/android-chrome-512x512.png', sizes: '512x512' },
            { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }, 
            // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            // { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: "" }
        ]
    }
}
})
