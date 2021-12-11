import got from 'got'
import cheerio from 'cheerio'

const TELEGRAM_BASE_URL = 'https://t.me'

async function telegramResolveUsername(username, options = defaultOptions) {
  const baseUrl = options.baseUrl || TELEGRAM_BASE_URL
  const throwOnError = options.throwOnError || false

  try {
    const response = await got(`${baseUrl}/${username}`)
    const $ = cheerio.load(response.body)

    if (!$('.tgme_page_title').length) {
      return null
    }

    const title = $('.tgme_page_title span').first().text()
    const photo = $('.tgme_page_photo_image').first().attr('src')
    const description = $('.tgme_page_description ').first().text()

    return {
      title,
      photo,
      username,
      description
    }
  } catch (error) {
    if (throwOnError) {
      throw error
    }

    return null
  }
}

export default telegramResolveUsername
