// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'shopClassic',
      themes: {
        shopClassic: {
          dark: false,
          colors: {
            background: '#eaf3e8',
            'on-background': '#1c291e',
            surface: '#f5f9f4',
            'on-surface': '#1c291e',
            primary: '#992e3a',
            'on-primary': '#ffffff',
            secondary: '#c2d5bf',
            'on-secondary': '#1c291e',
            error: '#ff6b6b',
            info: '#8fa7a1',
            success: '#7fa66a',
            warning: '#e0a44f',
          },
        },
      },
    }
  })
  app.vueApp.use(vuetify)
})
