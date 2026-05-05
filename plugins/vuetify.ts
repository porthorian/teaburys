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
          dark: true,
          colors: {
            background: '#101111',
            surface: '#181a18',
            primary: '#d94a43',
            secondary: '#779566',
            accent: '#f2d7c9',
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
