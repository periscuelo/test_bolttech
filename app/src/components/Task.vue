<script>
import DialogComponent from './Dialog.vue'

export default {
  components: {
    DialogComponent
  },
  props: ['project'],
  emits: ['submitEvent'],
  data: () => ({
    fields: [
      {
        type: 'text',
        name: 'description',
        label: 'Task Description',
        value: ''
      }
    ],
    dialog: false,
    dialogTitle: '',
    description: '',
    taskId: 0,
  }),
  methods: {
    closeDialog(value) {
      this.dialog = value
    },
    setData(field) {
      this[field.name] = field.value
    },
    openDialog(option, data) {
      this.dialogTitle = option
      this.dialog = !this.dialog
      this.taskId = 0
      this.description = ''

      if (data?.id) {
        this.taskId = data.id
        this.description = data.description
      }
    },
    saveTask() {
      if (!this.taskId) {
        const newId = Math.floor(Math.random() * 200) + 100
        this.project.tasks.push({
          id: newId,
          description: this.description,
          createdAt: new Date().toISOString().split('T')[0],
          finishedAt: ''
        })
      } else {
        const dataIdx = this.project.tasks.findIndex(task => task.id === this.taskId)
        if (dataIdx >= 0) {
          this.project.tasks[dataIdx].description = this.description
        }
      }

      this.dialog = false
    },
  },
  watch: {
    description(newValue) {
      this.fields[0].value = newValue
    },
  }
}
</script>

<template>
  <DialogComponent :title="dialogTitle" :fields="fields" :showDialog="dialog" @dialogEvent="closeDialog"
    @inputChange="setData" @submitEvent="saveTask" />
</template>