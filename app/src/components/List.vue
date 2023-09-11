<script>
export default {
  props: ['foreign', 'results', 'check', 'fields', 'identity'],
  emits: ['editTask', 'inputChange', 'removeTask'],
  computed: {
    filteredData() {
      const [filteredFields] = this.fields.filter((field) => {
        if (field[this.foreign] == this.identity) return field[this.results]
      })

      return filteredFields[this.results]
    },
    filteredUndone() {
      return this.filteredData.filter((item) => {
        if (!item[this.check]) return item
      })
    },
    filteredDone() {
      return this.filteredData.filter((item) => {
        if (item[this.check]) {
          item.finishedAt = new Date().toISOString().split('T')[0]
          return item
        }
      })
    }
  },
  methods: {
    edit(identity, data) {
      this.$emit("editTask", identity, data);
    },
    handleChange(identity, itemId, value) {
      this.$emit("inputChange", { identity, itemId, value });
    },
    remove(identity, id) {
      this.$emit("removeTask", identity, id);
    },

  }
}
</script>

<template>
  <div class="d-flex justify-center body app">
    <v-sheet width="400" class="mx-auto">
      <v-form>

        <h2 class="mb-2">Todo</h2>
        <div class="d-flex" v-for="field in filteredUndone" :key="field.id">
          <v-tooltip activator="parent" location="top">
            Created At: {{ field.createdAt }} <br />
            Finished At: {{ field.finishedAt }}
          </v-tooltip>

          <v-checkbox v-model="field.done" :label="field.description"
            @change="handleChange(identity, field.id, $event.target.checked)" />
          <v-btn class="mt-2" size="small" color="surface-variant" variant="text" icon="mdi-note-edit"
            @click="edit(identity, field)" />
          <v-btn class="mt-2" size="small" color="surface-variant" variant="text" icon="mdi-delete"
            @click="remove(identity, field.id)" />

        </div>

        <h2 class="mb-2" v-show="filteredDone.length">Done</h2>
        <div class="d-flex" v-for="field in filteredDone" :key="field.id">
          <v-tooltip activator="parent" location="top">
            Created At: {{ field.createdAt }} <br />
            Finished At: {{ field.finishedAt }}
          </v-tooltip>

          <v-checkbox v-model="field.done" :label="field.description" disabled="disabled" />

        </div>

      </v-form>
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