function generateUrl (url, params, page = 1, count = 20) {
  const limit = count
  const offset = (page - 1) * limit
  let endpoint = `${url}?limit=${limit}&offset=${offset}&`

  Object.keys(params).forEach(key => {
    endpoint += `${key}=${params[key]}&`
  })

  return endpoint
}

function getArrayIds (array) {
  let ids = ''

  const length = array.length
  let counter = 1

  array.forEach(element => {
    ids += `${element.value}`
    ids += (counter === length) ? `` : `,`
    counter++
  })

  return ids
}

export { generateUrl, getArrayIds }
