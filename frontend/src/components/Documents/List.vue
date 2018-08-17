<template>
  <v-content>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <v-container grid-list-sm fluid class="grey lighten-4" fill-height>
      <v-layout row wrap>
        <v-flex xs2 sm3 v-for="doc in documents" :key="doc.id">
          <Document :doc="doc"></Document>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Document from './Document'
import Breadcrumbs from '../Widgets/Breadcrumbs'
export default {
  name: 'Documents',
  created () {
    this.getDocuments(this.$route.params)
  },
  data () {
    return {
      search: '',
      documents: [],
      breadcrumbs: []
    }
  },

  watch: {
    $route () {
      this.getDocuments(this.$route.params)
    }
  },

  methods: {
    getDocuments (params) {
      this.breadcrumbs = [{text: 'Documents', to: 'Documents'}]
      var uri = 'api/documents/?format=json'
      if (params.tagId !== undefined) {
        if (params.tagId === '-1') {
          uri += '&tags__empty=true'
          this.breadcrumbs.push({text: 'Documents without tags'})
        } else {
          uri += '&tags__slug_0=' + params.tagId + '&tags__slug_1=startswith&tags__slug_2=endswith'
          let found = this.$store.getters.tagBySlug(params.tagId)
          if (found) {
            this.breadcrumbs.push({text: 'Tagged ' + found.name})
          } else {
            this.breadcrumbs.push({text: 'Tagged by unknown tag'})
          }
        }
      }

      if (params.search !== undefined) {
        uri += '&search=' + params.search
        this.breadcrumbs.push({text: params.search})
      }

      this.$http.get(uri)
        .then(request => { this.buildDocuments(null, request.data) })
        .catch((err) => { this.buildDocuments(err, []) })
    },

    buildDocuments (err, data) {
      if (err) {
        console.log(err)
        return
      }

      this.documents = data.results
    }
  },
  components: {
    Document,
    Breadcrumbs
  }
}
</script>

<style lang="css">
</style>
