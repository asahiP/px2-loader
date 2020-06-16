const { resolve } = require('path')
const { readFile, writeFile } = require('fs')
const { transformPX } = require('../lib/px2')

function main(input) {
  readFile(resolve(__dirname, input), { encoding: 'utf-8' }, (err, data) => {
    const [filename, ...other] = input.split('.')
    writeFile(
      resolve(__dirname, [filename, 'transformed', other].join('.')),
      transformPX(data),
      (err) => console.log(err)
    )
  })
}

main(...process.argv.slice(2))