<script>
import ToolBarComponent from '@/components/ToolBar.vue'
import CardComponent from '@/components/Card.vue'

export default {
  components: {
    ToolBarComponent,
    CardComponent
  },
  methods: {
    openDialog(dialogTitle) {
      this.$refs.CardComp.openDialog(dialogTitle)
    }
  }
}
</script>

<template>
  <div class="dash">
    <ToolBarComponent title="Dashboard(User)" @openDialog="openDialog" />
    <CardComponent ref="CardComp" />
  </div>
</template>

<style scoped>
.dash {
  width: 100%;
  padding: 0.3rem;
  text-align: left;
}
</style>