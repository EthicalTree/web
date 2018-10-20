// pass in an array. If the array is null or undefined,
// use a dummy list of "size"
export const getListOrDummy = (list, size) => {
  if (list == null) {
    return new Array(size).fill({})
  }
  return list
}
