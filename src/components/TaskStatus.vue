<template>
  <div>
    <span class="task-status open" v-if="isOpened"> Открыто </span>
    <span class="task-status working" v-else-if="isInProgress">В работе</span>
    <span class="task-status testing" v-else-if="isTesting">Тестирование</span>
    <span class="task-status complite" v-else-if="isComplete">Сделано</span>
  </div>
</template>

<script>
import { statuses } from "../common/const";

export default {
  data() {
    return {
      statuses,
    };
  },
  props: {
    status: String,
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
};
</script>

<style lang="scss" scoped>
.task-status {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font-size: 14px;

  padding-top: 2px;

  width: 78px;
  height: 20px;

  background-color: #cccccc;
  color: #333333;
  border: 1px solid #333333;
  border-radius: 5px;

  &.working,
  &.testing,
  &.complite {
    @include task-status(#ffc700, #846f00, #846f00);
  }

  &.testing {
    width: 113px;
  }

  &.complite {
    @include task-status(#4bd379, #157536, #157536);
  }
}
</style>