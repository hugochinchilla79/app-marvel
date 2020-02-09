<template>
  <div class="q-pa-md">
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
      characters: []
    }
  },
  methods: {},
  computed: {},
  beforeMount () {
    const { baseUrl, characters } = api

    const commonParams = hash.get()
    const url = `${baseUrl}${characters.path}`

    const endpoint = generateUrl(url, commonParams)

    console.log(endpoint)
    this.$axios.get(endpoint).then(response => {
      console.log(response.data.status)
      if (response.data.code === 200) {
        console.log(response.data.data.result)
        this.characters = response.data.data.results
      }
    })
  }
}
</script>
