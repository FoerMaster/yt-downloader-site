import { createWriteStream } from 'fs'
import { mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'
import youtubeDl from 'youtube-dl-exec'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { url } = body

    if (!url) {
      return { error: 'Необходимо указать URL видео' }
    }

    try {
      const fileName = `${randomUUID()}.mp4`
      
      // Create downloads directory if it doesn't exist
      const downloadDir = join(process.cwd(), 'public', 'downloads')
      await mkdir(downloadDir, { recursive: true })
      
      const filePath = join(downloadDir, fileName)

      // Download the video
      await youtubeDl(url, {
        output: filePath,
        format: 'best[ext=mp4]',
        noCheckCertificates: true,
        noWarnings: true,
        addHeader: [
          'referer:youtube.com',
          'user-agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        ]
      })

      // Schedule file deletion after 10 minutes
      setTimeout(async () => {
        try {
          await unlink(filePath)
          console.log(`Deleted temporary file: ${fileName}`)
        } catch (err) {
          console.error(`Error deleting file ${fileName}:`, err)
        }
      }, 10 * 60 * 1000) // 10 minutes in milliseconds

      return {
        downloadUrl: `/downloads/${fileName}`
      }
    } catch (downloadError) {
      console.error('Download error:', downloadError)
      return { error: 'Не удалось скачать видео. Пожалуйста, попробуйте еще раз.' }
    }
  } catch (error) {
    console.error('Request error:', error)
    return { error: 'Произошла ошибка при обработке запроса' }
  }
})