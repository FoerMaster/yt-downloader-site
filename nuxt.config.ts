// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    downloadDir: 'downloads'
  },
  app: {
    head: {
      title: 'YouTube Скачивание Видео - Бесплатно и Быстро',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'Скачивайте видео с YouTube бесплатно и без регистрации. Быстрое скачивание в высоком качестве. Поддержка всех форматов.'
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'скачать видео youtube, youtube downloader, скачать с ютуба, загрузить видео, youtube скачивание'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})