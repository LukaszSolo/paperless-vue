<template>
  <v-content>
    <v-container grid-list-sm fluid class="grey lighten-4" fill-height>
    <v-layout row wrap>
      <v-list two-line subheader>
        <v-subheader inset>Logs</v-subheader>
        <template v-for="(item, index) in logs">
        <v-list-tile :key="item.id">
          <v-list-tile-content>
            <v-list-tile-sub-title>{{item.time | moment("dddd, MMMM Do YYYY")}}</v-list-tile-sub-title>
            <v-list-tile-title>{{ item.messages }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < logs.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Logs',
  mounted () {
    this.getLogs()
  },
  data () {
    return {
      logs: []
    }
  },
  methods: {
    getLogs () {
      this.$http.get('api/logs/?format=json')
        .then(request => { this.logs = request.data.results })
        .catch(() => { this.logs = [] })
    }
  }
}
</script>
