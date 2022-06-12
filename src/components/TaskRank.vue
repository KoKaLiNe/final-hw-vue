<template>
  <div>
    <div class="task-prioirity" :class="rank">
      <svg width="14" height="6">
        <use :xlink:href="`#status-${rank}`" />
      </svg>
      <p>{{ ranks[rank].name }}</p>
    </div>
  </div>
</template>

<script>
import { ranks } from "../common/const";
export default {
  data() {
    return {
      ranks,
    };
  },
  props: {
    rank: String,
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.task-prioirity {
  display: flex;
  flex-direction: row;
  align-items: middle;

  font-size: 14px;

  & svg {
    transform: translateY(25%);
    margin-right: 5px;
  }

  &.low {
    color: $successColor;
  }

  &.medium {
    color: #e9b500;

    & svg {
      transform: translateY(50%);
    }
  }

  &.high {
    color: $errorColor;
  }
}
</style>