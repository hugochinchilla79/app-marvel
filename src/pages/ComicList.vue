<template>
  <div>
    <div class="row">
      <div class="col-12">
        <q-card class="my-card q-pa-md">
          <q-card-section>
            <div class="row">
              <div
                class="col-xs-12 col-lg-6 col-md-6 col-sm-6 text-center self-align-center q-pa-sm"
              >
                <q-select
                  filled
                  use-input
                  v-model="filters.format"
                  input-debounce="0"
                  label="Format"
                  :options="formats"
                >
                </q-select>
              </div>

              <div
                class="col-xs-12 col-lg-4 col-md-4 col-sm-4 text-left self-align-center q-pa-sm"
              >
                <q-btn v-on:click="filterByFormat()" color="primary">
                  FILTER BY FORMAT
                </q-btn>
              </div>

              <div
                class="col-xs-12 col-lg-2 col-md-2 col-sm-2 text-left self-align-center q-pa-sm"
              >
                <q-btn v-on:click="clearFilters()" color="primary">
                  CLEAR FILTERS
                </q-btn>
              </div>
            </div>
          </q-card-section>
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

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        v-if="!isFiltered && !isLoading"
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
import Comic from '../components/Comic.vue'

export default {
  name: 'PageComic',
  components: {
    Comic
  },
  data () {
    return {
      comics: [],
      currentPage: 1,
      total: 1,
      count: 20,
      order: 'title',
      isLoading: false,
      filters: {
        format: ''
      },
      formats: [
        {
          label: 'Comic',
          value: 'comic'
        },
        {
          label: 'Magazine',
          value: 'magazine'
        },
        {
          label: 'Hardcover',
          value: 'hardcover'
        },
        {
          label: 'Trade paperback',
          value: 'trade paperback'
        },
        {
          label: 'Digest',
          value: 'digest'
        },
        {
          label: 'Graphic novel',
          value: 'graphic novel'
        },
        {
          label: 'Digital Comic',
          value: 'digital comic'
        },
        {
          label: 'Infinite comic',
          value: 'infinite comic'
        }
      ],
      isFiltered: false
    }
  },
  methods: {
    changePage () {
      if (this.isFiltered) {
        return
      }

      const { baseUrl, comics } = api
      const commonParams = hash.get()
      const url = `${baseUrl}${comics.path}`
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
            this.comics = response.data.data.results
          }
        })
        .catch(() => {})
        .finally(() => {
          this.isLoading = false
          this.$q.loading.hide()
          window.scrollTo(0, 0)
        })
    },
    getFilteredComics (page = 1, count = 20, filters = null) {
      const { baseUrl, comics } = api
      let commonParams = hash.get()

      let params = filters
        ? { ...commonParams, ...filters }
        : { ...commonParams }

      const url = `${baseUrl}${comics.path}`
      const endpoint = generateUrl(url, params, page, count)

      this.$axios.get(endpoint).then(response => {
        if (response.data.code === 200) {
          this.total = Math.floor(
            response.data.data.total / response.data.data.count
          )

          this.total =
            response.data.data.total % response.data.data.count !== 0
              ? this.total + 1
              : this.total
          this.comics = response.data.data.results
          this.currentPage = 1
          this.isFiltered = true
        }
      })
    },
    filterByFormat () {
      if (this.filters.format === '') {
        this.$q.notify({
          message: 'You must select one format',
          position: 'top'
        })

        return
      }

      const filters = {
        format: this.filters.format.value
      }

      this.getFilteredComics(1, 20, filters)
    },
    clearFilters () {
      this.filters.format = ''
      this.isFiltered = false
    }
  },
  beforeMount () {
    this.changePage()
  }
}
</script>
