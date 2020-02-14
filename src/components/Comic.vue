<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="fit full-height" full-height flat bordered dark>
        <q-img v-bind:src="img" full-height />

        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ value.title }}</div>
          <div class="text-caption text-grey"></div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            v-if="!isSaved"
            v-on:click="saveComic()"
            flat
            round
            color="red"
            icon="favorite_border"
          />
          <q-btn v-if="isSaved" v-on:click="deleteComic()" flat round color="red" icon="favorite" />
          <q-space />

          <q-btn
            :to="{
              name: 'comic-stories',
              params: { id: value.id }
            }"
            flat
            color="primary"
            label="Stories"
          />

          <q-btn
            :to="{
              name: 'comics-characters',
              params: { id: value.id }
            }"
            flat
            color="primary"
            label="Characters"
          />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subitle2">
              {{ value.description }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </div>
</template>

<script>
import storage from '../storage'

export default {
  name: 'comic',
  props: {
    value: Object
  },
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    saveComic () {
      storage.saveComic(this.value)
      storage.saveComicId(this.value.id)
    },
    deleteComic () {
      storage.deleteComic(this.value)
      storage.deleteComicId(this.value.id)
    }
  },
  computed: {
    img () {
      return `${this.value.thumbnail.path}.${this.value.thumbnail.extension}`
    },
    isSaved () {
      return storage.comicIds.indexOf(this.value.id) !== -1
    }
  }
}
</script>
