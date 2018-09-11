const urlUtil = require('url')
const sslChecker = require('ssl-checker')

module.exports = function checkUrlForValidCertificate(url) {
  let host = urlUtil.parse(url).hostname
  return new Promise((resolve, reject) => {
    sslChecker(host, 'GET', 443).then(response => {
      if(response.days_remaining < 0) {
        reject(response)
      }
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}