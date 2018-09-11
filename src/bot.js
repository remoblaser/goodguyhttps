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

  addValidatedHost(host) {
    this.validatedHosts.push(host)
  }

  isHostValidated(host) {
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
    if(tweet.user.followers_count < 300)
      return false
    if(tweet.user.protected)
      return false
    return true
  }
}

module.exports = GoodGuyHttpsBot