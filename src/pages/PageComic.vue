<template>
  <div>
    <div class="row">
      <div
        v-for="comic in comics"
        v-bind:key="comic.id"
        class="col-xs-12 col-sm-4 col-lg-3 col-md-3"
      >
        <comic v-bind:value="comic"></comic>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../api'
import { generateUrl } from '../commons/common'
import hash from '../commons/hash'

export default {
  name: 'PageComic',
  data () {
    return {
      comics: []
    }
  },
  beforeMount () {
    const { baseUrl, comic } = api
    const commonParams = hash.get()
    const url = `${baseUrl}${comic.path}`
    console.log(url)

    const endpoint = generateUrl(url, commonParams)

    this.$axios.get(endpoint).then(response => {
      console.log(response)
      if (response.data.code === 200) {
        this.comics = response.data.data.results
      }
    })
  }
}
</script>
