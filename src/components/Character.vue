<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="fit full-height"
        style="min-height: 400px"
        full-height
        flat
        bordered
        dark
      >
        <q-img v-bind:src="img" full-height />

        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ value.name }}</div>
          <div class="text-caption text-grey"></div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            :to="{
              name: 'characters-comics',
              params: { id: value.id, comicsUri: value.comics.collectionURI }
            }"
            flat
            color="primary"
            label="Comics"
          />
          <q-btn
            :to="{
              name: 'characters-stories',
              params: { id: value.id, storiesUri: value.comics.collectionURI }
            }"
            flat
            color="primary"
            label="Stories"
          />
          <q-btn v-if="!isSaved" v-on:click="saveCharacter()" flat round color="red" icon="favorite_border" />
          <q-btn v-if="isSaved" v-on:click="deleteCharacter()" flat round color="red" icon="favorite" />

          <q-space />

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
  name: 'character',
  props: {
    value: Object
  },
  data () {
    return {
      expanded: false,
      storage: storage
    }
  },
  methods: {
    saveCharacter () {
      storage.saveCharacter(this.value)
      storage.saveCharacterId(this.value.id)
    },
    deleteCharacter () {
      storage.deleteCharacter(this.value)
      storage.deleteCharacterId(this.value.id)
    }
  },
  computed: {
    img () {
      return `${this.value.thumbnail.path}.${this.value.thumbnail.extension}`
    },
    isSaved () {
      return (storage.characterIds.indexOf(this.value.id) !== -1)
    }
  },
  beforeMount () {

  }
}
</script>
