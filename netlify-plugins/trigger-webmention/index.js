export const onEnd = async function () {
  console.log(process.cwd())
  // list all files in the current directory
  const files = await fs.readdir(process.cwd())
  console.log(files)
}
