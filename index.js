require('dotenv').config()

const Twit = require('twit')
const tall = require('tall').default
const GoodGuyHttpsBot = require('./src/bot')
const checkCertificate = require('./src/check-certificate')
const logger = require('./src/logger')

logger.info('Started bot')

let bot = new GoodGuyHttpsBot()
let T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

let stream = T.stream('statuses/filter', {track: 'http'})

stream.on('tweet', tweet => {
  if(! bot.isTweetValid(tweet))
    return

  let url = bot.getUrlInTweet(tweet)
  if(! url)
    return

  tall(url).then(unshortenedUrl => {
    if(! bot.websiteBelongsToUser(url, tweet.user))
      return
    if(bot.isUrlAlreadyValidated(unshortenedUrl))
      return
    bot.addValidatedUrl(unshortenedUrl)

    checkCertificate(unshortenedUrl).then((valid) => {
      if(! valid) {
        logger.info('Certificate seems invalid for', unshortenedUrl)
        let reply = bot.createFriendlyReply(tweet.user)
        T.post('statuses/update', {
          in_reply_to_status_id: tweet.id_str,
          status: reply
        })
      }
    }).catch(logger.error)
  }).catch(logger.error)
})