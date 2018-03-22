
const ETHICALITY_TAGS = {
  vegan: 'vegan',
  vegetarian: 'vegetarian',
  'fair trade': 'fair_trade',
  'woman owned': 'woman_owned',
  organic: 'organic'
}

export const extractEthicalitiesFromSearchQuery = (query, ethicalities) => {
  const result = Object.keys(ETHICALITY_TAGS).reduce((acc, key) => {
    const newQuery = acc[0].replace(key)

    if (acc[0] !== newQuery) {
      acc[1].push(ETHICALITY_TAGS[key])
    }

    return acc
  }, [query.toLowerCase(), []])

  return {
    query: result[0],
    ethicalities: [...ethicalities, ...result[1]]
  }
}
