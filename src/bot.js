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
}

module.exports = GoodGuyHttpsBot