'use strict';

const { getOptions } = require('loader-utils')
const { transformPX } = require('./lib/px2')

module.exports = function(content, map, meta) {
  const options = getOptions(this)

  this.cacheable && this.cacheable()
  this.callback(
    null,
    transformPX(content, options),
    map,
    meta
  )
  return
}