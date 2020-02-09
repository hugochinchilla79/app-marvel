function generateUrl (url, params) {
  let endpoint = `${url}?`

  Object.keys(params).forEach(key => {
    endpoint += `${key}=${params[key]}&`
  })

  return endpoint
}

export { generateUrl }
