<template>
  <v-app id="paperless">
    <Navbar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Tag from '@/models/Tag'

export default {
  name: 'App',
  data: () => ({
    drawer: null
  }),

  props: {
    source: String
  },
  components: {
    Navbar
  },
  mounted () {
    this.$http.get('api/tags/?format=json')
      .then(request => { this.buildTags(null, request.data) })
      .catch((e) => { this.buildTags(e, {'results': []}) })
  },

  methods: {
    buildTags (e, data) {
      let tags = []
      for (var i in data.results) {
        let res = data.results[i]
        let t = new Tag(res.id, res.slug, res.name, res.colour, res.match, res.matching_algorithm)
        tags.push(t)
      }

      this.$store.commit('SET_TAGS', tags)
    }
  }
}
</script>
