<template>
  <div>
    <svg v-if="isBug" width="24" height="24">
      <use :xlink:href="`#type-bug`" />
    </svg>
    <svg v-else-if="isTask" width="24" height="24">
      <use :xlink:href="`#type-task`" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    taskType: String,
  },
  computed: {
    isTask() {
      return this.taskType === "task";
    },
    isBug() {
      return this.taskType === "bug";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>