<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="fit full-height" full-height flat bordered dark>
        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ value.title }}</div>
          <div class="text-caption text-grey"></div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            v-if="!isSaved"
            v-on:click="saveStory()"
            flat
            round
            color="red"
            icon="favorite_border"
          />
          <q-btn
            v-if="isSaved"
            v-on:click="deleteStory()"
            flat
            round
            color="red"
            icon="favorite"
          />

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
  name: 'story',
  props: {
    value: Object
  },
  data () {
    return {
      expanded: false
    }
  },
  methods: {
    saveStory () {
      storage.saveStory(this.value)
      storage.saveStoryId(this.value.id)
    },
    deleteStory () {
      storage.deleteStory(this.value)
      storage.deleteStoryId(this.value.id)
    }
  },
  computed: {
    img () {
      return `${this.value.thumbnail.path}.${this.value.thumbnail.extension}`
    },
    isSaved () {
      return storage.storyIds.indexOf(this.value.id) !== -1
    }
  }
}
</script>
