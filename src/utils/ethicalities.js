export const serializeEthicalities = ethicalities => {
  let newEthicalities = ethicalities

  if (newEthicalities && Array.isArray(newEthicalities)) {
    newEthicalities = newEthicalities.join(',')
  }

  return newEthicalities
}

export const deserializeEthicalities = ethicalities => {
  let newEthicalities = ethicalities

  if (newEthicalities && !Array.isArray(newEthicalities)) {
    newEthicalities = newEthicalities.split(',')
  }

  return newEthicalities
}
