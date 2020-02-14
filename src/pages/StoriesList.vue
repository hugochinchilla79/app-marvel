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

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        v-if="!isLoading"
        color="black"
        :max="total"
        :max-pages="15"
        :boundary-numbers="false"
        @input="changePage()"
      >
      </q-pagination>
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
      stories: [],
      currentPage: 1,
      total: 1,
      count: 20,
      order: 'id',
      isLoading: false
    }
  },
  methods: {
    changePage () {
      const { baseUrl, stories } = api
      const commonParams = hash.get()
      const url = `${baseUrl}${stories.path}`
      commonParams['orderBy'] = this.order
      const endpoint = generateUrl(
        url,
        commonParams,
        this.currentPage,
        this.count
      )
      this.$q.loading.show()
      this.isLoading = true
      this.$axios
        .get(endpoint)
        .then(response => {
          if (response.data.code === 200) {
            this.total = Math.floor(
              response.data.data.total / response.data.data.count
            )

            this.total =
              response.data.data.total % response.data.data.count !== 0
                ? this.total + 1
                : this.total
            this.stories = response.data.data.results
          }
        })
        .catch(() => {})
        .finally(() => {
          this.isLoading = false
          this.$q.loading.hide()
          window.scrollTo(0, 0)
        })
    }
  },
  computed: {},

  beforeMount () {
    this.changePage()
  }
}
</script>
