export const getDistance = (lat1, lng1, lat2, lng2) => {
  if (lat1 && lng1 && lat2 && lng2 && window.google) {
    const latLng1 = new window.google.maps.LatLng(lat1, lng1)
    const latLng2 = new window.google.maps.LatLng(lat2, lng2)

    const meters = window.google.maps.geometry.spherical.computeDistanceBetween(
      latLng1,
      latLng2
    )
    const kilometers = meters / 1000

    return kilometers
  }
}
