/*
  example:

  conditional([
    [true, () => "I am true"],
    [false, () => "I am false"]
  ]) === "I am true"
*/
export const conditional = (list, defaultValue = null) => {
  const li = list.find(l => l[0])
  return li ? li[1]() : defaultValue
}
