<script>
import FormComponent from './Form.vue'

export default {
  components: {
    FormComponent
  },
  props: ['title', 'fields', 'showDialog'],
  emits: ['dialogEvent', 'inputChange', 'submitEvent'],
  data: () => ({
    dialog: false,
  }),
  methods: {
    handleChange(data) {
      const { name, value } = data
      this.$emit("inputChange", { name, value });
    },
    handleSubmit() {
      this.$emit("submitEvent");
    }
  },
  watch: {
    showDialog(newValue) {
      this.dialog = newValue
    },
    dialog(newValue) {
      this.$emit('dialogEvent', newValue)
    }
  }
}
</script>

<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <v-card-text>
        <FormComponent :title="title" :fields="fields" @inputChange="handleChange" @submitEvent="handleSubmit">
          <template v-slot:buttons>
            <v-btn type="submit" color="primary" block class="mt-2">Save</v-btn>
          </template>
        </FormComponent>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>