<template>
  <v-dialog v-model="dialog" persistent max-width="900px">
    <v-btn slot="activator" small color="primary">
      <v-icon left>edit</v-icon>Edit
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Edit {{doc.title}}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-form ref="form" v-model="valid" lazy-validation>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field :rules="titleRules" label="Title" required v-model="title"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea name="content" label="Content" v-model="content"></v-textarea>
            </v-flex>
            <v-flex xs12>
              <v-autocomplete
                :items="allTags"
                v-model="currentSelectedTags"
                label="Tags"
                item-text="tagName"
                item-value="id"
                multiple
                chips
              >
                <template
                  slot="selection"
                  slot-scope="data"
                >
                  <v-chip
                    :selected="data.selected"
                    close
                    class="chip--select-multi"
                    @input="data.parent.selectItem(data.item)"
                  >
                    {{ data.item.tagName }}
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-flex>
          </v-layout>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="cancel">Cancel</v-btn>
        <v-btn color="warning" :disabled="!valid" @click="submit">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'EditDocument',
  props: ['doc', 'selectedTags'],
  data: () => ({
    dialog: false,
    valid: true,
    title: '',
    titleRules: [v => !!v || 'Title is required'],
    content: '',
    allTags: [],
    currentSelectedTags: []
  }),
  mounted () {
    this.allTags = this.$store.getters.tags
    this.currentSelectedTags = []
    for (var i in this.selectedTags) {
      this.currentSelectedTags.push(this.selectedTags[i].id)
    }
    this.title = this.doc.title
    this.content = this.doc.content
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        let toSend = []
        for (var i in this.currentSelectedTags) {
          toSend.push(this.$http.defaults.baseURL + '/api/tags/' + this.currentSelectedTags[i] + '/?format=json')
        }

        this.$http.put('/api/documents/' + this.doc.id + '/?format=json', {
          title: this.title,
          content: this.content,
          correspondent: null,
          tags: toSend
        }).then((response) => {
          this.$router.push({name: 'Documents'})
        }).catch((err) => {
          console.log(err)
          this.$router.push({name: 'Documents'})
        })
      }
    },
    cancel () {
      this.dialog = false
      this.currentSelectedTags = []
      for (var i in this.selectedTags) {
        this.currentSelectedTags.push(this.selectedTags[i].id)
      }
      this.title = this.doc.title
      this.content = this.doc.content
    }
  }
}
</script>
