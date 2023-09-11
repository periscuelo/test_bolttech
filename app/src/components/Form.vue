<script>
export default {
  props: ['title', 'fields'],
  emits: ['inputChange', 'submitEvent'],
  methods: {
    handleChange(name, value) {
      this.$emit("inputChange", { name, value });
    },
    focus(key) {
      return key === 0
    }
  }
}
</script>

<template>
  <div class="d-flex justify-center body app">
    <v-sheet width="400" class="mx-auto">
      <h1>{{ title }}</h1><br />
      <v-form fast-fail @submit.prevent="$emit('submitEvent')">

        <div v-for="(field, i) in fields" :key="i">
          <v-text-field :type="field.type" :name="field.name" :autofocus="focus(i)" :value="field.value"
            @input="handleChange($event.target.name, $event.target.value)" :label="field.label" variant="outlined" />
        </div>

        <slot name="buttons"></slot>

      </v-form>
      <slot name="links"></slot>
    </v-sheet>
  </div>
</template>

<style scoped>
.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
</style>