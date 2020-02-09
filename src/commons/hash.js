const md5 = require('md5')

const hash = {
  get () {
    const publicKey = process.env.PUBLIC_KEY
    const timestamp = new Date().getUTCSeconds()
    const privateKey = process.env.PRIVATE_KEY
    return {
      apikey: publicKey,
      ts: timestamp,
      hash: md5(`${timestamp}${privateKey}${publicKey}`)
    }
  }
}

export default hash
