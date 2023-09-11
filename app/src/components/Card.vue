<script>
import DialogComponent from './Dialog.vue'
import ListComponent from './List.vue'
import TaskComponent from './Task.vue'

export default {
  components: {
    DialogComponent,
    ListComponent,
    TaskComponent
  },
  data: () => ({
    fields: [
      {
        type: 'text',
        name: 'projectName',
        label: 'Project Name',
        value: ''
      }
    ],
    dialog: false,
    dialogTitle: '',
    projectName: '',
    projectId: 0,
    project: {},
    cards: [
      { id: 1, title: 'Pre-fab homes', flex: 4 },
      { id: 2, title: 'Favorite road trips', flex: 4 },
      { id: 3, title: 'Best airlines', flex: 4 },
    ],
    projects: [
      {
        projectId: 1,
        tasks: [
          { id: 1, description: 'Lorem ispum dolor 1', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 2, description: 'Lorem ispum dolor 2', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 3, description: 'Lorem ispum dolor 3', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 4, description: 'Lorem ispum dolor 4', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 5, description: 'Lorem ispum dolor 5', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 6, description: 'Lorem ispum dolor 6', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 7, description: 'Lorem ispum dolor 7', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 8, description: 'Lorem ispum dolor 8', createdAt: '2023-07-06', finishedAt: '2023-09-10', done: true },
          { id: 9, description: 'Lorem ispum dolor 9', createdAt: '2023-07-06', finishedAt: '2023-09-10', done: true },
          { id: 10, description: 'Lorem ispum dolor 10', createdAt: '2023-07-06', finishedAt: '2023-09-10', done: true },
        ]
      },
      {
        projectId: 2,
        tasks: [
          { id: 1, description: 'Lorem ispum dolor 1', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 2, description: 'Lorem ispum dolor 2', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 3, description: 'Lorem ispum dolor 3', createdAt: '2023-07-06', finishedAt: '2023-09-10', done: true },
          { id: 4, description: 'Lorem ispum dolor 4', createdAt: '2023-07-06', finishedAt: '', done: false },
        ]
      },
      {
        projectId: 3,
        tasks: [
          { id: 1, description: 'Lorem ispum dolor 1', createdAt: '2023-07-06', finishedAt: '', done: false },
          { id: 2, description: 'Lorem ispum dolor 2', createdAt: '2023-07-06', finishedAt: '2023-09-10', done: true },
          { id: 3, description: 'Lorem ispum dolor 3', createdAt: '2023-07-06', finishedAt: '2023-09-10', done: true },
          { id: 4, description: 'Lorem ispum dolor 4', createdAt: '2023-07-06', finishedAt: '', done: false },
        ]
      }
    ]
  }),
  methods: {
    addTask(projectId) {
      const projectIdx = this.projects.findIndex(project => project.projectId === projectId)
      this.project = this.projects[projectIdx]

      this.$refs.TaskComp.openDialog('Create Task')
    },
    closeDialog(value) {
      this.dialog = value
    },
    edit(data) {
      this.openDialog('Edit Project', data)
    },
    editProjectTask(projectId, data) {
      const projectIdx = this.projects.findIndex(project => project.projectId === projectId)
      this.project = this.projects[projectIdx]

      this.$refs.TaskComp.openDialog('Edit Task', data)
    },
    setData(field) {
      this[field.name] = field.value
    },
    openDialog(option, data) {
      this.dialogTitle = option
      this.dialog = !this.dialog
      this.projectId = 0
      this.projectName = ''

      if (data) {
        this.projectId = data.id
        this.projectName = data.title
      }
    },
    removeProject(id) {
      const cardIdx = this.cards.findIndex(card => card.id === id)
      const projectIdx = this.projects.findIndex(project => project.projectId === id)

      this.cards.splice(cardIdx, 1)
      this.projects.splice(projectIdx, 1)
    },
    removeProjectTask(projectId, taskId) {
      const projectIdx = this.projects.findIndex(project => project.projectId === projectId)
      const taskIdx = this.projects[projectIdx].tasks.findIndex(task => task.id === taskId)
      this.projects[projectIdx].tasks.splice(taskIdx, 1)
    },
    saveProject() {
      if (!this.projectId) {
        const newId = Math.floor(Math.random() * 200) + 4
        this.cards.push({
          id: newId,
          title: this.projectName,
          flex: 4
        })
        this.projects.push({
          projectId: newId,
          tasks: []
        })
      } else {
        const dataIdx = this.cards.findIndex(card => card.id === this.projectId)
        if (dataIdx >= 0) {
          this.cards[dataIdx].title = this.projectName
        }
      }

      this.dialog = false
    },
  },
  watch: {
    projectName(newValue) {
      this.fields[0].value = newValue
    }
  }
}
</script>

<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row dense>
        <v-col v-if="!cards.length" class="text-center" cols="12">Please Create Projects</v-col>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card>
            <v-card-title v-text="card.title" />

            <v-card-actions>
              <v-spacer />

              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-table-column-plus-before"
                title="Add Task" @click="addTask(card.id)" />

              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-application-edit-outline"
                title="Edit Project" @click="edit(card)" />

              <v-btn size="small" color="surface-variant" variant="text" icon="mdi-card-remove-outline"
                title="Remove Project" @click="removeProject(card.id)" />

              <v-spacer />
            </v-card-actions>

            <v-expand-transition>
              <v-card-text>
                <ListComponent foreign="projectId" results="tasks" check="done" :fields="projects" :identity="card.id"
                  @inputChange="setData" @editTask="editProjectTask" @removeTask="removeProjectTask" />
              </v-card-text>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <DialogComponent :title="dialogTitle" :fields="fields" :showDialog="dialog" @dialogEvent="closeDialog"
    @inputChange="setData" @submitEvent="saveProject" />
  <TaskComponent ref="TaskComp" :project="project" />
</template>