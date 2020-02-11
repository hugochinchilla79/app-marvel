<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-xs-12 col-lg-3 col-md-3 col-sm-6 text-center">
        <q-input v-model="filters.name" label="Name" outlined> </q-input>
      </div>
      <div
        class="col-xs-12 col-lg-3 col-md-3 col-sm-6 text-center self-align-center"
      >
        <q-btn v-on:click="getFilteredCharacters()" color="primary">
          Search
        </q-btn>
      </div>
    </div>

    <div class="row">
      <div
        v-for="character in characters"
        v-bind:key="character.id"
        class="col-xs-12 col-lg-3 col-md-3 col-sm-6 text-center"
      >
        <character v-bind:value="character"></character>
      </div>
    </div>
  </div>
</template>

<script>
import hash from '../commons/hash'
import { generateUrl } from '../commons/common'
import api from '../api'

import Character from '../components/Character.vue'

export default {
  name: 'PageCharacterList',
  components: {
    Character
  },
  data () {
    return {
      characters: [],
      filters: {
        name: ''
      }
    }
  },
  methods: {
    getFilteredCharacters () {
      const { baseUrl, characters } = api
      let commonParams = hash.get()
      commonParams['name'] = this.filters.name
      const url = `${baseUrl}${characters.path}`
      const endpoint = generateUrl(url, commonParams)

      this.$axios.get(endpoint).then(response => {
        if (response.data.code === 200) {
          this.characters = response.data.data.results
        }
      })
    }
  },
  computed: {},
  beforeMount () {
    this.$q.loading.show()
    const { baseUrl, characters } = api
    const commonParams = hash.get()
    const url = `${baseUrl}${characters.path}`
    const endpoint = generateUrl(url, commonParams)

    this.$axios.get(endpoint).then(response => {
      this.$q.loading.hide()
      if (response.data.code === 200) {
        this.characters = response.data.data.results
      }
    })
  }
}
</script>
