import fs from 'fs'

export const onEnd = async function () {
  console.log(process.cwd())
  // list all files in the current directory
  const files = fs.readdirSync(process.cwd())
  console.log(files)
}
