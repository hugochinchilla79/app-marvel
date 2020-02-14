<template>
  <div>
    <div class="q-pa-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">My favorite items</div>
          <div class="text-subtitle2">by Hugo Chinchilla</div>
        </q-card-section>

        <q-tabs v-model="tab" class="text-teal">
          <q-tab label="Characters" name="characters" />
          <q-tab label="Comics" name="comics" />
          <q-tab label="Stories" name="stories" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="characters">
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
          </q-tab-panel>

          <q-tab-panel name="comics">
            <div class="row">
              <div
                v-for="comic in comics"
                v-bind:key="comic.id"
                class="col-xs-12 col-sm-4 col-lg-3 col-md-3"
              >
                <comic v-bind:value="comic"></comic>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="stories">
           <div class="row">
              <div
                v-for="story in stories"
                v-bind:key="story.id"
                class="col-xs-12 col-sm-4 col-lg-3 col-md-3"
              >
                <story v-bind:value="story"></story>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import storage from '../storage'
import Character from '../components/Character.vue'
import Comic from '../components/Comic.vue'
import Story from '../components/Story.vue'

export default {
  name: 'page-saved-items',
  components: {
    Character,
    Comic,
    Story
  },
  data () {
    return {
      tab: 'characters',
      characters: storage.characters,
      comics: storage.comics,
      stories: storage.stories
    }
  },
  methods: {},
  computed: {}
}
</script>
