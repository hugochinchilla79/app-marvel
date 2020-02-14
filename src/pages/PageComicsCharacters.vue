<template>
  <div>
    <div v-if="comic" class="row q-pa-md">
      <div class="col-xs-12 col-sm-4 col-lg-4 col-md-4">
        <q-card class="my-card">
          <q-img :src="img" style="max-height:250px;" basic>
            <div class="absolute-bottom text-h6">
             {{ comic.title }} comics
            </div>
          </q-img>
        </q-card>
      </div>

    </div>

    <div class="row">
      <div
        v-for="character in characters"
        v-bind:key="character.id"
        class="col-xs-12 col-sm-4 col-lg-3 col-md-3"
      >
        <character v-bind:value="character"></character>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import hash from '../commons/hash'
import { generateUrl } from '../commons/common'
import Character from '../components/Character.vue'

export default {
  props: ['id'],
  components: {
    Character
  },
  data () {
    return {
      comic: null,
      characters: []
    }
  },
  name: 'PageComicCharacters',
  methods: {},
  computed: {
    img () {
      if (this.comic) {
        console.log(this.comic)
        return `${this.comic.thumbnail.path}.${this.comic.thumbnail.extension}`
      }

      return ''
    }
  },
  beforeMount () {
    const { baseUrl, comics } = api

    const comicUrl = `${baseUrl}${comics.path}/${this.id}`
    const characterUrl = `${baseUrl}${comics.path}/${this.id}/characters`
    const commonParams = hash.get()

    const endpoint = generateUrl(characterUrl, commonParams)
    const comicEndpoint = generateUrl(comicUrl, commonParams)

    const requests = [
      this.$axios.get(endpoint),
      this.$axios.get(comicEndpoint)
    ]

    this.$q.loading.show()

    this.$axios.all(requests).then(
      this.$axios.spread((...responses) => {
        this.$q.loading.hide()

        const responseCharacter = responses[0]
        const responseComic = responses[1]

        if (responseCharacter.data.code === 200) {
          this.characters = responseCharacter.data.data.results
        }

        console.log(responseComic)
        if (responseComic.data.code === 200) {
          this.comic = responseComic.data.data.results[0]
        }
      })
    )
  }
}
</script>
