var log = require('loglevel');
var lpre = require('loglevel-plugin-prefix')

lpre.reg(log)
lpre.apply(log, {
  template: '[%t] %l (%n): '
})

log.setLevel(log.levels.DEBUG)

module.exports = log.getLogger('goodguyhttps')