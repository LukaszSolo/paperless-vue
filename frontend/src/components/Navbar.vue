<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      clipped
      class="grey lighten-4"
      app
      >
      <v-list dense class="grey lighten-4">
        <v-list-tile :to="{ name: 'Documents'}">
          <v-list-tile-action><v-icon>content_copy</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">Documents</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-layout row align-center>
          <v-flex xs6>
            <v-subheader>Tags</v-subheader>
          </v-flex>
        </v-layout>

        <v-list-tile v-for="tag in tags" :key="tag.id" :to="{ name: 'TaggedDocuments', params: { tagId: tag.slug } }">
          <v-list-tile-action><v-icon :style="style_color(tag.tagColor)">label</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">{{ tag.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ name: 'TaggedDocuments', params: { tagId: '-1' }}">
          <v-list-tile-action ><v-icon :style="style_color('#C62828')">label</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="red--text">No tags</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider dark class="my-3"></v-divider>

        <v-list-tile :to="{ name: 'Logs'}">
          <v-list-tile-action><v-icon>chat_bubble</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="grey--text">Logs</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="amber" app clipped-left>
      <v-toolbar-side-icon @click.native="drawer = !drawer"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Paperless</span>
      <v-text-field
        v-model="search"
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
        @keyup.enter="submitSearch"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',

  data: () => ({
    drawer: null,
    search: ''
  }),

  props: {
    source: String
  },

  methods: {
    submitSearch () {
      this.$router.push({ name: 'SearchedDocuments', params: { search: this.search } })
    },
    style_color (hex) {
      return 'color:' + hex
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    }
  }
}
</script>
