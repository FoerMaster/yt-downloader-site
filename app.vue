<template>
  <div class="min-h-screen bg-white">
    <div class="container mx-auto px-4 py-12">
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">YouTube Скачивание Видео</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Бесплатный сервис для скачивания видео с YouTube в высоком качестве. Быстро, безопасно и без регистрации.
        </p>
      </header>

      <div class="max-w-3xl mx-auto border border-gray-200 rounded-xl shadow-sm p-8 bg-white">
        <form @submit.prevent="downloadVideo" class="space-y-6">
          <div>
            <label for="url" class="block text-sm font-medium text-gray-700">Ссылка на видео YouTube</label>
            <div class="mt-2 flex gap-4">
              <input
                id="url"
                v-model="videoUrl"
                type="text"
                @input="handleUrlInput"
                placeholder="https://www.youtube.com/watch?v=..."
                class="block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black text-base p-3"
                required
              />
              <button
                type="submit"
                :disabled="isLoading || !isValidUrl"
                class="flex-shrink-0 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <div class="flex items-center">
                  <span v-if="!isLoading">Скачать</span>
                  <svg v-else class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </button>
            </div>
            <p v-if="!isValidUrl && videoUrl" class="mt-2 text-sm text-red-600">
              Пожалуйста, введите корректную ссылку на видео YouTube
            </p>
          </div>
        </form>
        
        <div v-if="videoInfo" class="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div class="flex items-start gap-4">
            <img 
              v-if="videoInfo.thumbnail" 
              :src="videoInfo.thumbnail" 
              :alt="videoInfo.title"
              class="w-48 h-27 object-cover rounded-lg"
            />
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ videoInfo.title }}</h3>
              <p class="text-sm text-gray-500 mt-1">ID: {{ videoInfo.id }}</p>
            </div>
          </div>
        </div>
        
        <div v-if="error" class="mt-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            {{ error }}
          </div>
        </div>
        
        <div v-if="downloadLink" class="mt-6 p-4 bg-green-50 border border-green-100 text-green-700 rounded-lg">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span class="font-medium">Видео готово!</span>
            <a :href="downloadLink" class="ml-2 text-black hover:text-gray-700 font-medium underline">Скачать файл</a>
          </div>
        </div>
      </div>

      <div class="mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <section class="bg-gray-50 p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Как скачать видео</h2>
          <ol class="space-y-3 text-gray-600">
            <li class="flex items-center gap-2">
              <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-sm">1</span>
              <span>Скопируйте ссылку на видео с YouTube</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-sm">2</span>
              <span>Вставьте ссылку в поле ввода</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-sm">3</span>
              <span>Нажмите кнопку "Скачать"</span>
            </li>
          </ol>
        </section>

        <section class="bg-gray-50 p-6 rounded-lg">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Преимущества сервиса</h2>
          <ul class="space-y-3 text-gray-600">
            <li class="flex items-center gap-2">
              <svg class="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Высокое качество видео</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Без регистрации</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="h-5 w-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Мгновенная загрузка</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const videoUrl = ref('')
const isLoading = ref(false)
const error = ref('')
const downloadLink = ref('')
const videoInfo = ref(null)
const isValidUrl = ref(false)
import { useDebounceFn } from '@vueuse/core'

// Функция для очистки URL от параметров
function cleanYouTubeUrl(url) {
  try {
    const urlObj = new URL(url)
    const videoId = urlObj.searchParams.get('v')
    if (videoId) {
      return `https://www.youtube.com/watch?v=${videoId}`
    }
    return url
  } catch {
    return url
  }
}

// Проверка валидности URL
function isYouTubeUrl(url) {
  const patterns = [
  /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/, // стандартная ссылка на видео
  /^https?:\/\/youtu\.be\/[\w-]{11}$/, // короткая ссылка
  /^https?:\/\/(www\.)?youtube\.com\/v\/[\w-]{11}$/, // ссылка формата /v/
  /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]{11}$/, // встроенная ссылка
  /^https?:\/\/youtu\.be\/[\w-]{11}(\?.*)?$/ // короткая ссылка с параметрами
];
  return patterns.some(pattern => pattern.test(url))
}

// Обработчик ввода URL
const handleUrlDebounced = useDebounceFn(async () => {
  if (!videoUrl.value) {
    videoInfo.value = null
    isValidUrl.value = false
    return
  }

  const cleanedUrl = cleanYouTubeUrl(videoUrl.value)
  isValidUrl.value = isYouTubeUrl(cleanedUrl)
  isLoading.value = true;
  if (isValidUrl.value) {
    try {
      const response = await $fetch('/api/info', {
        method: 'POST',
        body: { url: cleanedUrl }
      })
      
      if (response.error) {
        error.value = response.error
        videoInfo.value = null
      } else {
        error.value = ''
        videoInfo.value = response
      }
    } catch (err) {
      error.value = 'Не удалось получить информацию о видео'
      videoInfo.value = null
    }
  } else {
    videoInfo.value = null
  }
  isLoading.value = false;
}, 500)

const handleUrlInput = () => {
  error.value = ''
  handleUrlDebounced()
}

async function downloadVideo() {
  if (!isValidUrl.value) return

  isLoading.value = true
  error.value = ''
  downloadLink.value = ''

  try {
    const cleanedUrl = cleanYouTubeUrl(videoUrl.value)
    const response = await $fetch('/api/download', {
      method: 'POST',
      body: { url: cleanedUrl }
    })
    
    if (response.error) {
      error.value = response.error
    } else {
      downloadLink.value = response.downloadUrl
    }
  } catch (err) {
    error.value = 'Произошла ошибка при скачивании видео. Пожалуйста, попробуйте еще раз.'
  } finally {
    isLoading.value = false
  }
}
</script>