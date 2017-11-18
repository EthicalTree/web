
class AddressException {
  constructor(msg) {
    this.message = msg
    this.name = 'AddressException'
  }
}

export const formatAddress = (components, format='simple') => {
  let addMap = {}

  components.forEach(component => {
    component.types.forEach(type => {
      addMap[type] = component['short_name']
    })
  })

  if (format === 'simple') {
    return `${addMap['street_number']} ${addMap['route']}, ${addMap['locality']}`
  }

  throw new AddressException(`${format} is not a valid format`)
}
