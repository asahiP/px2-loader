'use strict';

const defaultOptions = {
  datum: 375,
  scale: 100,
  outputUnit: 'vw',
  minPixelValue: 1,
  precision: 6,
  ignore: 'ignore'
}

function toFixed (num, precision) {
  const multiple = Math.pow(10, precision)
  return Math.round(num * multiple) / multiple
}

function transformPX (content, customOptions) {
  const options = Object.assign({}, defaultOptions, customOptions)
  const { ignore, outputUnit, datum, scale, minPixelValue, precision } = options
  const ignoreRegExp = `\\/\\*\\s*${ignore}\\s*\\*\\/`
  const regExp = new RegExp(`\\b(\\d+(\\.\\d+)?)px\\b(?!;?\\s*${ignoreRegExp})`, 'g')
  const computedValue = val => {
    const pixels = parseFloat(val.slice(0, -2))

    /** 当值小于minPixelValue跳出 */
    if (pixels <= minPixelValue) return val

    const result = outputUnit === 'rem'
      ? pixels / scale
      : pixels / datum * 100
    return toFixed(result, precision).toString(10) + outputUnit
  }

  return content
    .replace(regExp, fragment => computedValue(fragment))
    .replace(new RegExp(ignoreRegExp, 'g'), '')
}

exports.transformPX = transformPX