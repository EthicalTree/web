class AddressException {
  constructor(msg) {
    this.message = msg
    this.name = 'AddressException'
  }
}

export const mapAddressComponents = components => {
  let addressMap = {}

  components.forEach(component => {
    component.types.forEach(type => {
      addressMap[type] = component['short_name']
    })
  })

  return addressMap
}

export const formatAddress = (components, format='simple') => {
  const addressMap = mapAddressComponents(components)

  if (format === 'simple') {
    return `${addressMap['street_number']} ${addressMap['route']}, ${addressMap['locality']}`
  }

  throw new AddressException(`${format} is not a valid format`)
}
