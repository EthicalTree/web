import { escapeRegex, squish } from '../utils/string'

export const parseEthicalitiesFromString = (str, ethicalities) => {
  let result = str
  let foundEthicalities = []

  ethicalities.forEach(ethicality => {
    const keyword = ethicality.name

    if (result.toUpperCase().includes(ethicality.name.toUpperCase())) {
      const regex = new RegExp(escapeRegex(keyword), 'ig')
      result = result.replace(regex, '')
      foundEthicalities.push(ethicality)
    }
  })

  return {
    result: squish(result),
    ethicalities: foundEthicalities,
  }
}
