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
import hash from '../commons/hash'
import { generateUrl } from '../commons/common'
import Comic from '../components/Comic.vue'

export default {
  props: {
    id: String
  },
  components: {
    Comic
  },
  data () {
    return {
      comics: []
    }
  },
  name: 'PageCharactersComic',
  methods: {},
  computed: {},
  beforeMount () {
    const { baseUrl, characters } = api

    const url = `${baseUrl}${characters.path}/${this.id}/comics`

    const commonParams = hash.get()
    const endpoint = generateUrl(url, commonParams)

    this.$q.loading.show()

    this.$axios.get(endpoint).then(response => {
      this.$q.loading.hide()
      if (response.data.code === 200) {
        console.log(response.data.data.results)
        this.comics = response.data.data.results
      }
    })
  }
}
</script>
