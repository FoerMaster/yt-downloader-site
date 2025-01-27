import youtubeDl from 'youtube-dl-exec'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { url } = body

    if (!url) {
      return { error: 'Необходимо указать URL видео' }
    }

    try {
      const videoInfo = await youtubeDl(url, {
        dumpSingleJson: true,
        noCheckCertificates: true,
        noWarnings: true,
        addHeader: [
          'referer:youtube.com',
          'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        ]
      })

      return {
        id: videoInfo.id,
        title: videoInfo.title,
        thumbnail: videoInfo.thumbnail
      }
    } catch (downloadError) {
      console.error('Info error:', downloadError)
      return { error: 'Не удалось получить информацию о видео' }
    }
  } catch (error) {
    console.error('Request error:', error)
    return { error: 'Произошла ошибка при обработке запроса' }
  }
})