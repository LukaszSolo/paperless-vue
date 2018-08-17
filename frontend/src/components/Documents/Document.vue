<template>
  <div>
    <div class="elevation-2 document" height="auto" :to="{ name: 'DocumentView', params: { id: doc.id } }">
      <router-link :to="{ name: 'DocumentView', params: { id: doc.id } }">
        <img :src="image" class="scan" height="auto" />
      </router-link>
      <Tags :tags="tags" :tagsClass="'tags'" />
      <v-slide-y-transition>
        <div class="description" v-show="show">
          <v-container fill-height>
            <p class="font-weight-thin body-2"  v-html="content"></p>
          </v-container>
        </div>
      </v-slide-y-transition>
      <p class="navigation">
          <v-btn fab icon small color="success" @click="show = !show">
           <v-icon>{{ show ? 'remove_red_eye' : 'remove_red_eye' }}</v-icon>
          </v-btn>
          <v-btn fab dark small color="warning" v-on:click="getFile()">
            <v-icon dark>archive</v-icon>
          </v-btn>
      </p>
    </div>
    <p class="text-xs-center headline">{{doc.title}}</p>
    <p class="text-xs-center font-weight-thin caption">{{doc.created | moment("dddd, MMMM Do YYYY")}}</p>
  </div>
</template>

<script>
import Tags from '../Widgets/Tags'
export default {
  name: 'Document',
  props: ['doc'],
  data () {
    var text = this.doc.content.replace(/\n/g, '<br />')
    if (text.length > 600) {
      text = text.substring(0, 597) + '...'
    }
    return {
      show: false,
      image: this.$http.defaults.baseURL + this.doc.thumbnail_url,
      content: text,
      tags: []
    }
  },
  mounted () {
    this.buildTags()
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
    buildTags (data) {
      let t = []
      for (var i in this.doc.tags) {
        let uri = this.doc.tags[i]
        let tagId = uri.replace(this.$http.defaults.baseURL + '/api/tags/', '').replace('/?format=json', '')
        t.push(this.$store.getters.tagById(tagId))
      }
      this.tags = t
    }
  },
  components: {
    Tags
  }
}
</script>
<style type="css">
    div.document {
        position: relative;
        max-width: 100%;
    }

    div.description {
        color: white;
        background: rgba(0,0,0,0.8);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    img.scan {
        max-width: 100%;
    }
    p.tags {
        position: absolute;
        top: 30px;
    }
    p.navigation {
        position: absolute;
        bottom: 0px;
    }
</style>
