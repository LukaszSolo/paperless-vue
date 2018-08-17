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
          <v-btn fab dark small color="warning" v-on:click="getFile()">
            <v-icon dark>archive</v-icon>
          </v-btn>
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
    getFile () {
      this.$http({
        url: this.doc.download_url,
        method: 'GET',
        responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.doc.file_name)
        document.body.appendChild(link)
        link.click()
        link.remove()
      })
    },

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
    Tags
  }
}
</script>
