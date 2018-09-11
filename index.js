require('dotenv').config()

const Twit = require('twit')
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

let stream = T.stream('statuses/filter', {track: 'http://'})

stream.on('tweet', tweet => {
  logger.info('Received tweet:', tweet.status)
  let url = bot.getUrlInTweet(tweet)
  if(! url || bot.isHostValidated(url))
    return
  bot.addValidatedHost(url)

  checkCertificate(url).then((response) => {
    logger.info('Certificate seems valid:', response)
  }).catch((error) => {
    logger.info('Certificate seems invalid:', error)
    let reply = bot.createFriendlyReply(tweet.user)
    T.post('statuses/update', {
      in_reply_to_status_id: tweet.id_str,
      status: reply
    })
  })
})