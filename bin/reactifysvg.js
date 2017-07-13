#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const exec = require('child_process').execSync

const args = process.argv
const dir = args.length > 2 ? args[2] : process.cwd()

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error("You didn't specify a directory. Butt.")
    process.exit(1)
  }

  const output = `${dir}/Icons`
  let fileMap = {}

  files.forEach(file => {
    if (!file.endsWith('.svg')) {
      return
    }

    const filename = file.replace('.svg', '')
    const key = filename.replace('-', '_')
    const name = filename.split("-").map(val => val[0].toUpperCase() + val.slice(1)).join('') + 'Icon'

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output)
    }

    exec(`svgtoreact ${filename} ${name} --output ${output} --no-format --rm-style`, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr)
      }
    })

    fileMap[key] = name

    process.stdout.write('.')
  })

  let index = ""

  for (let key in fileMap) {
    const obj = fileMap[key]
    index += `import ${obj} from './${obj}'\n`
  }

  index += "\n\n\n"
  index += "export {\n"

  for (let key in fileMap) {
    const obj = fileMap[key]
    index += `\t${key}: ${obj},\n`
  }

  index += "}\n"

  fs.writeFile(`${output}/index.js`, index)

  console.log('')
  console.log('Complete!')
})
