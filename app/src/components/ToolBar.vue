<script>
export default {
  props: ['title'],
  emits: ['openDialog'],
  methods: {
    openDialog() {
      this.$emit('openDialog', 'Create Project')
    },
    logout() {
      this.$router.push('/')
    }
  },
}
</script>

<template>
  <v-toolbar>
    <v-toolbar-title :title="title">{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat @click="openDialog">Create Project</v-btn>
      <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>