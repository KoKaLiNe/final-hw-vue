<template>
  <div>
    <div v-if="isOpened">
      <CustomBtn
        class="btn-board__header"
        @click="changeStatus(statuses.inProgress.value)"
        >{{ statuses.inProgress.btn }}</CustomBtn
      >
      <CustomBtn
        class="btn-board__header"
        @click="changeStatus(statuses.complete.value)"
        >{{ statuses.complete.btn }}</CustomBtn
      >
    </div>

    <div v-if="isInProgress">
      <CustomBtn
        class="btn-board__header"
        @click="changeStatus(statuses.testing.value)"
        >{{ statuses.testing.btn }}</CustomBtn
      >
      <CustomBtn
        class="btn-board__header"
        @click="changeStatus(statuses.complete.value)"
        >{{ statuses.complete.btn }}</CustomBtn
      >
      <CustomBtn
        class="btn-board__header"
        @click="changeStatus(statuses.opened.value)"
        >{{ statuses.opened.btn }}</CustomBtn
      >
    </div>

    <div v-if="isTesting">
      <CustomBtn
        class="btn-board__header"
        @click="changeStatus(statuses.complete.value)"
        >{{ statuses.complete.btn }}</CustomBtn
      >
      <CustomBtn
        class="btn-board__header"
        @click="changeStatus(statuses.opened.value)"
        >{{ statuses.opened.btn }}</CustomBtn
      >
    </div>

    <div v-if="isComplete">
      <CustomBtn
        class="btn-board__header"
        v-if="isComplete"
        @click="changeStatus(statuses.opened.value)"
        >{{ statuses.opened.btn }}</CustomBtn
      >
    </div>
  </div>
</template>

<script>
import { statuses } from "../common/const";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      statuses,
    };
  },
  props: {
    taskId: String,
    status: String,
  },
  methods: {
    ...mapActions("tasks", ["editStatus"]),
    changeStatus(status) {
      this.editStatus({ taskId: this.taskId, status });
    },
  },
  computed: {
    isOpened() {
      return this.status === this.statuses.opened.value;
    },
    isInProgress() {
      return this.status === this.statuses.inProgress.value;
    },
    isTesting() {
      return this.status === this.statuses.testing.value;
    },
    isComplete() {
      return this.status === this.statuses.complete.value;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>