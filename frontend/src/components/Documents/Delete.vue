<template>
  <v-dialog v-model="deleteDialog" width="500" >
    <v-btn small color="error" slot="activator">
      <v-icon left>delete_forever</v-icon>Remove
    </v-btn>
    <v-card>
      <v-card-text>Are you sure you want to remove <b>{{doc.title }}</b>?</v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="deleteDialog = false">Cancel</v-btn>
        <v-btn color="error" flat v-on:click="deleteDoc()">Remove</v-btn>
      </v-card-actions>
     </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'DeleteDocument',
  props: ['doc'],
  data: () => ({
    deleteDialog: false
  }),
  methods: {
    deleteDoc () {
      this.$http.delete('/api/documents/' + this.doc.id + '?format=json')
        .then((response) => {
          this.$router.push({name: 'Documents'})
        }).catch((err) => {
          console.log(err)
          this.$router.push({name: 'Documents'})
        })
    }
  }
}
</script>
