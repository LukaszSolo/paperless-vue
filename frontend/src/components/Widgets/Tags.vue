<template>
  <p :class="tagsClass">
      <v-btn small color="teal" class="white--text" v-for="tag in tags" :key="tag.id" :to="{ name: 'TaggedDocuments', params: { tagId: tag.slug } }">
        <v-icon :style="style_color(tag.tagColor)" left>label</v-icon>{{ tag.name }}
      </v-btn>
  </p>
</template>
<script>
export default {
  name: 'Tags',
  props: ['tags', 'tagsClass'],
  methods: {
    style_color: function (hex) {
      return 'color:' + hex
    }
  }
}
</script>
