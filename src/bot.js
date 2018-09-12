const urlUtil = require('url')
const REPLIES = require('./replies')

class GoodGuyHttpsBot {
  constructor() {
    this.validatedHosts = []
  }

  createFriendlyReply(user) {
    return "@" + user.screen_name + " " + REPLIES[Math.floor(Math.random()*REPLIES.length)]
  }

  getUrlInTweet(tweet) {
    for(let url of tweet.entities.urls) {
      let expandedUrl = url.expanded_url
      if(this.isHttpUrl(expandedUrl)) {
        return expandedUrl
      }
    }
    return false
  }

  isHttpUrl(url) {
    return url.startsWith('http://')
  }

  addValidatedUrl(url) {
    let host = urlUtil.parse(url).hostname
    this.validatedHosts.push(host)
  }

  isUrlAlreadyValidated(url) {
    let host = urlUtil.parse(url).hostname
    return this.validatedHosts.indexOf(host) > -1
  }

  isTweetValid(tweet) {
    if(tweet.in_reply_to_status_id !== null)
      return false
    if(tweet.is_quote_status)
      return false
    if(tweet.possibly_sensitive)
      return false
    if(tweet.lang !== null && tweet.lang !== 'en')
      return false
    if(tweet.user.followers_count < 500)
      return false
    if(tweet.user.favourites_count < 200)
      return false
    if(tweet.user.statuses_count < 100)
      return false
    if(tweet.user.default_profile)
      return false
    if(tweet.user.protected)
      return false
    return true
  }

  websiteBelongsToUser(url, user) {
    let host = urlUtil.parse(url).hostname
    if(user.url && user.url.includes(host))
      return true
    if(user.description && user.description.includes(host))
      return true
    return false
  }
}

module.exports = GoodGuyHttpsBot