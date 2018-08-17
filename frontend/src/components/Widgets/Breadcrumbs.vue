<template>
  <v-breadcrumbs class="grey lighten-4">
    <v-icon slot="divider">chevron_right</v-icon>
      <v-breadcrumbs-item
        v-for="bc in breadcrumbs"
        :exact="true"
        :key="bc.text"
        :to="{name: bc.to}"
      >
      {{ bc.text }}
    </v-breadcrumbs-item>
  </v-breadcrumbs>
</template>
<script>
export default {
  name: 'Breadcrumbs',
  props: ['breadcrumbs']
}
</script>
