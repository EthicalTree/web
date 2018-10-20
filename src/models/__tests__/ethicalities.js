import { parseEthicalitiesFromString } from '../ethicalities'

describe('test ethicalities', () => {
  test('parsing out querystring with no ethicality matches', () => {
    const query = 'burgers'

    const { result, ethicalities } = parseEthicalitiesFromString(
      query,
      ETHICALITIES
    )

    expect(result).toEqual('burgers')
    expect(ethicalities.length).toEqual(0)
  })

  test('parsing out single ethicality', () => {
    const query = 'vegan'

    const { result, ethicalities } = parseEthicalitiesFromString(
      query,
      ETHICALITIES
    )

    expect(result).toEqual('')
    expect(ethicalities[0].name).toEqual('Vegan')
  })

  test('parsing out multiple ethicalities', () => {
    const query = 'vegan vegetarian'

    const { result, ethicalities } = parseEthicalitiesFromString(
      query,
      ETHICALITIES
    )

    expect(result).toEqual('')
    expect(ethicalities.length).toEqual(2)
  })

  test('parsing out ethicalities with gaps in query', () => {
    const query = 'burger vegan pizza'

    const { result, ethicalities } = parseEthicalitiesFromString(
      query,
      ETHICALITIES
    )

    expect(result).toEqual('burger pizza')
    expect(ethicalities[0].name).toEqual('Vegan')
  })
})

const ETHICALITIES = [
  {
    id: 1,
    name: 'Vegetarian',
    slug: 'vegetarian',
    iconKey: 'vegetarian',
    createdAt: '2017-07-13T14:46:23.000Z',
    updatedAt: '2018-02-20T00:59:47.000Z',
  },
  {
    id: 2,
    name: 'Vegan',
    slug: 'vegan',
    iconKey: 'vegan',
    createdAt: '2017-07-13T14:46:23.000Z',
    updatedAt: '2018-02-20T00:59:47.000Z',
  },
  {
    id: 3,
    name: 'Woman Owned',
    slug: 'woman_owned',
    iconKey: 'woman_owned',
    createdAt: '2017-07-13T14:46:23.000Z',
    updatedAt: '2018-02-20T00:59:47.000Z',
  },
  {
    id: 4,
    name: 'Fair Trade',
    slug: 'fair_trade',
    iconKey: 'fair_trade',
    createdAt: '2017-07-13T14:46:23.000Z',
    updatedAt: '2018-02-20T00:59:47.000Z',
  },
  {
    id: 5,
    name: 'Organic',
    slug: 'organic',
    iconKey: 'organic',
    createdAt: '2018-01-27T22:22:07.000Z',
    updatedAt: '2018-02-20T00:59:47.000Z',
  },
]
