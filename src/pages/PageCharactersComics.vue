<template>
  <div>
    <div v-if="character" class="row q-pa-md">
      <div class="col-xs-12 col-sm-4 col-lg-4 col-md-4">
        <q-card class="my-card">
          <q-img :src="img" style="max-height:250px;" basic>
            <div class="absolute-bottom text-h6">
             {{ character.name }} comics
            </div>
          </q-img>
        </q-card>
      </div>
    </div>

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
      comics: [],
      character: null
    }
  },
  name: 'PageCharactersComic',
  methods: {},
  computed: {
    img () {
      return `${this.character.thumbnail.path}.${this.character.thumbnail.extension}`
    }
  },
  beforeMount () {
    const { baseUrl, characters } = api

    const characterUrl = `${baseUrl}${characters.path}/${this.id}`
    const url = `${baseUrl}${characters.path}/${this.id}/comics`
    const commonParams = hash.get()

    const endpoint = generateUrl(url, commonParams)
    const characterEndpoint = generateUrl(characterUrl, commonParams)

    const requests = [
      this.$axios.get(endpoint),
      this.$axios.get(characterEndpoint)
    ]

    this.$q.loading.show()

    this.$axios.all(requests).then(
      this.$axios.spread((...responses) => {
        this.$q.loading.hide()

        const responseComics = responses[0]
        const responseCharacter = responses[1]

        if (responseComics.data.code === 200) {
          this.comics = responseComics.data.data.results
        }

        console.log(responseCharacter)
        if (responseCharacter.data.code === 200) {
          this.character = responseCharacter.data.data.results[0]
        }
      })
    )
  }
}
</script>
