<template>
  <div>
    <div class="row">
      <div
        v-for="story in stories"
        v-bind:key="story.id"
        class="col-xs-12 col-sm-4 col-lg-3 col-md-3"
      >
        <story v-bind:value="story"></story>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api'
import { generateUrl } from '../commons/common'
import hash from '../commons/hash'
import Story from '../components/Story.vue'

export default {
  name: 'PageStories',
  components: {
    Story
  },
  data () {
    return {
      stories: []
    }
  },
  methods: {},
  computed: {},

  beforeMount () {
    const { baseUrl, stories } = api
    const commonParams = hash.get()
    const url = `${baseUrl}${stories.path}`

    const endpoint = generateUrl(url, commonParams)

    this.$axios.get(endpoint).then(response => {
      if (response.data.code === 200) {
        this.stories = response.data.data.results
      }
    })
  }
}
</script>
