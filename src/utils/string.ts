import pkg from '../../package.json'

export function projectSign(text: string, project?: string, version?: string) {
  const projectName = project || pkg.name
  const projectVersion = version || pkg.version

  return `${projectName}-${projectVersion}-${text}`
}
