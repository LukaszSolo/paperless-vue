<template>
  <v-btn small :loading="loading" :disabled="loading" color="warning" v-on:click="getFile()">
    <v-icon left>archive</v-icon>Download
    <span slot="loader">Downloading...</span>
  </v-btn>
</template>
<script>
export default {
  name: 'DownloadDocument',
  props: ['doc'],
  data: () => ({
    loading: false
  }),
  methods: {
    getFile () {
      this.loading = true
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
        this.loading = false
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    }
  }
}
</script>
