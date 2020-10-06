import fs from 'fs'
import path from 'path'
import YAML from 'yaml'

export function loadProjects () {
  return YAML.parse(fs.readFileSync(path.join(process.cwd(), './data/projects.yml'), 'utf-8'))
}
