<template>
  <div class="q-pa-md">
    <q-card class="my-card q-pa-md">
      <q-card-section>
        <div class="row">
          <div class="col-xs-12 col-lg-6 col-md-6 col-sm-6 text-center q-pa-sm">
            <q-input v-model="filters.name" label="Part or full name" outlined>
            </q-input>
          </div>

          <div class="col-xs-12 col-lg-6 col-md-6 col-sm-6 text-left q-pa-sm">
            <q-btn v-on:click="filterCharactersByName()" color="primary">
              Filter by Name
            </q-btn>
          </div>
        </div>

        <div class="row">
          <div
            class="col-xs-12 col-lg-6 col-md-6 col-sm-6 text-center self-align-center q-pa-sm"
          >
            <q-select
              filled
              use-input
              multiple
              use-chips
              v-model="filters.comic"
              input-debounce="0"
              label="Enter a comic's name"
              :options="comics"
              @filter="getComics"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>

          <div
            class="col-xs-12 col-lg-6 col-md-6 col-sm-6 text-left self-align-center q-pa-sm"
          >
            <q-btn v-on:click="filterCharactersByComics()" color="primary">
              FILTER BY COMICS
            </q-btn>
          </div>
        </div>

        <div class="row">
          <div class="col-3 q-pa-sm text-left">
            <q-btn v-on:click="clearFilters()" color="primary">
              Clean filters
            </q-btn>
          </div>
          <div class="col-3 q-pa-sm text-left">
            <q-btn v-on:click="filterByAll()" color="primary">
              Filter by all
            </q-btn>
          </div>
          <div class="col-3 q-pa-sm text-left">
            <q-btn v-on:click="orderAsc()" color="primary">
              Order by Name ASC
            </q-btn>
          </div>
          <div class="col-3 q-pa-sm text-left">
            <q-btn v-on:click="orderDesc()" color="primary">
              Order by Name DESC
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="row">
      <div
        v-for="character in characters"
        v-bind:key="character.id"
        class="col-xs-12 col-lg-3 col-md-3 col-sm-6 text-center"
        style="min:height: 500px"
      >
        <character v-bind:value="character"></character>
      </div>
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="currentPage"
        v-if="!isFiltered"
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
import hash from '../commons/hash'
import { generateUrl, getArrayIds } from '../commons/common'
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
        name: '',
        comic: [],
        story: []
      },
      currentPage: 1,
      total: 1,
      count: 20,
      comics: [],
      stories: [],
      currentUrl: '',
      isFiltered: false,
      dataFilters: {
        nameStartsWith: '',
        comics: '',
        stories: ''
      },
      order: 'name'
    }
  },
  methods: {
    getFilteredCharacters (page = 1, count = 20, filters = null) {
      const { baseUrl, characters } = api
      let commonParams = hash.get()

      let params = filters
        ? { ...commonParams, ...filters }
        : { ...commonParams }

      const url = `${baseUrl}${characters.path}`
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
          this.characters = response.data.data.results
          this.currentPage = 1
          this.isFiltered = true
        }
      })
    },
    changePage () {
      if (this.filtered) {
        return
      }

      const { baseUrl, characters } = api
      const commonParams = hash.get()
      const url = `${baseUrl}${characters.path}`
      commonParams['orderBy'] = this.order
      const endpoint = generateUrl(
        url,
        commonParams,
        this.currentPage,
        this.count
      )

      this.currentUrl = endpoint

      this.$q.loading.show()
      this.$axios
        .get(this.currentUrl)
        .then(response => {
          if (response.data.code === 200) {
            this.total = Math.floor(
              response.data.data.total / response.data.data.count
            )

            this.total =
              response.data.data.total % response.data.data.count !== 0
                ? this.total + 1
                : this.total
            this.characters = response.data.data.results
          }
        })
        .catch(() => {})
        .finally(() => {
          this.$q.loading.hide()
          window.scrollTo(0, 0)
        })
    },
    getComics (val, update, abort) {
      const { baseUrl, comics } = api
      let commonParams = hash.get()

      const url = `${baseUrl}${comics.path}`
      console.log(val)
      if (val !== '') {
        commonParams['titleStartsWith'] = val
      }

      const endpoint = generateUrl(url, commonParams)

      update(() => {
        this.$axios
          .get(endpoint)
          .then(response => {
            this.comics = response.data.data.results.map(comic => {
              return {
                value: comic.id,
                label: comic.title
              }
            })
          })
          .catch(() => {
            abort()
          })
          .finally(() => {})
      })
    },
    filterCharactersByName () {
      if (this.filters.name.trim() === '') {
        this.$q.notify({
          message: 'You must enter a name to filter',
          position: 'top'
        })
        return
      }

      const filters = {
        nameStartsWith: this.filters.name
      }
      this.getFilteredCharacters(1, 20, filters)
    },
    filterCharactersByComics () {
      if (this.filters.comic.length === 0) {
        this.$q.notify({
          message: 'You must enter at least one comic',
          position: 'top'
        })

        return
      }
      const filters = {
        comics: getArrayIds(this.filters.comic)
      }
      console.log(filters)
      this.getFilteredCharacters(1, 20, filters)
    },
    filterCharactersByStories () {
      if (this.filters.story.length === 0) {
        this.$q.notify({
          message: 'You must enter at least one storie',
          position: 'top'
        })
      }

      const filters = {
        stories: getArrayIds(this.filters.story)
      }

      this.getFilteredCharacters(1, 20, filters)
    },
    filterByAll () {
      let filters = null

      if (
        this.filters.name.trim !== '' &&
        this.filters.comic.length > 0 &&
        this.filters.story.length > 0
      ) {
        return null
      }

      if (this.filters.name.trim !== '') {
        filters['nameStartsWith'] = this.filters.name
      }

      if (this.filters.comic.length > 0) {
        filters['comics'] = getArrayIds(this.filters.comic)
      }

      if (this.filters.story.length > 0) {
        filters['stories'] = getArrayIds(this.filters.story)
      }

      return filters
    },
    clearFilters () {
      this.filters.name = ''
      this.filters.story = []
      this.filters.comic = []
      this.isFiltered = false
      this.currentPage = 1
      this.changePage()
    },
    orderAsc () {
      this.order = 'name'
      this.changePage()
    },
    orderDesc () {
      this.order = '-name'
      this.changePage()
    }
  },
  computed: {},
  beforeMount () {
    this.changePage()
  }
}
</script>
