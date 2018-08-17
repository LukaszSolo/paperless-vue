<template>
  <v-content>
    <Breadcrumbs :breadcrumbs="breadcrumbs" />
    <v-container grid-list-md text-xs-center class="grey lighten-4" fill-height>
      <v-layout row wrap v-if="doc">
        <v-flex xs6>
          <p class="headline">{{doc.title}}</p>
          <p class="font-weight-thin caption">
            Created on {{doc.created | moment("dddd, MMMM Do YYYY")}}<br />
            Uploaded on {{doc.modified | moment("dddd, MMMM Do YYYY")}}<br />
            <Tags :tags="tags" />
          </p>
          <v-divider />
          <p class="font-weight-thin body-2"  v-html="content"></p>
          <v-divider />
          <DownloadDocument :doc="doc" />
          <EditDocument :doc="doc" :selectedTags="tags" />
          <DeleteDocument :doc="doc" />
        </v-flex>
        <v-flex xs6>
          <img :src="image" class="scan elevation-2" height="auto" />
        </v-flex>
      </v-layout>
      <v-layout row wrap v-else>
        <v-flex xs12>
          <v-progress-circular
              :size="70"
              :width="7"
              color="amber"
              indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import Breadcrumbs from '../Widgets/Breadcrumbs'
import Tags from '../Widgets/Tags'
import DownloadDocument from './Download'
import EditDocument from './Edit'
import DeleteDocument from './Delete'

export default {
  name: 'DocumentView',
  created () {
    this.getDocument(this.$route.params.id)
  },
  data () {
    return {
      breadcrumbs: [],
      doc: null,
      image: null,
      content: '',
      tags: []
    }
  },

  watch: {
    $route () {
      this.getDocument(this.$route.params.id)
    }
  },

  methods: {
    getDocument (docId) {
      this.$http.get('/api/documents/' + docId + '?format=json')
        .then(request => { this.buildDocument(null, request.data) })
        .catch((err) => { this.buildDocument(err, null) })
    },

    buildTags (data) {
      let t = []
      for (var i in data.tags) {
        let uri = data.tags[i]
        let tagId = uri.replace(this.$http.defaults.baseURL + '/api/tags/', '').replace('/?format=json', '')
        let found = this.$store.getters.tagById(tagId)
        if (found) {
          t.push(found)
        }
      }
      this.tags = t
    },

    buildDocument (err, data) {
      if (err) {
        console.log(err)
        return
      }

      if (data === undefined) {
        return
      }

      this.buildTags(data)
      this.doc = data
      this.breadcrumbs = [{text: 'Documents', to: 'Documents'}, {text: this.doc.title}]
      this.content = this.doc.content.replace(/\n/g, '<br />')
      this.image = this.$http.defaults.baseURL + this.doc.thumbnail_url
    }
  },
  components: {
    Breadcrumbs,
    Tags,
    DownloadDocument,
    EditDocument,
    DeleteDocument
  }
}
</script>
