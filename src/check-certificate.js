const urlUtil = require('url')
const sslCertificate = require('get-ssl-certificate')

module.exports = (url) => {
  let host = urlUtil.parse(url).hostname
  return new Promise((resolve) => {
    sslCertificate.get(host).then(() => {
      resolve(true)
    }).catch((error) => {
      console.log(error)
      resolve(false)
    })
  })
}