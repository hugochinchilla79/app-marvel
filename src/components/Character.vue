<template>
  <div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="fit full-height" full-height flat bordered dark>
        <q-img v-bind:src="img" full-height/>

        <q-card-section>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ value.name }}</div>
          <div class="text-caption text-grey">
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="primary" label="Comics" />
          <q-btn flat color="primary" label="Stories" />
          <q-btn flat round color="red" icon="favorite_border" />

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
export default {
  name: 'character',
  props: {
    value: Object
  },
  data () {
    return {
      expanded: false
    }
  },
  methods: {},
  computed: {
    img () {
      return `${this.value.thumbnail.path}.${this.value.thumbnail.extension}`
    }
  }
}
</script>
