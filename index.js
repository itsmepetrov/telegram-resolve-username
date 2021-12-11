const axios = require('axios')
const cheerio = require('cheerio')

const TELEGRAM_BASE_URL = 'https://t.me'

async function telegramResolveUsername(username, options = {}) {
  const { baseUrl = TELEGRAM_BASE_URL, throwOnError = false, ...rest } = options

  try {
    const response = await axios.get(`${baseUrl}/${username}`, rest)
    const $ = cheerio.load(response.data)

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
      description,
    }
  } catch (error) {
    if (throwOnError) {
      throw error
    }

    return null
  }
}

module.exports = telegramResolveUsername
