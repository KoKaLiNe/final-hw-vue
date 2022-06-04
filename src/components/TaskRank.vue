<template>
  <div>
    <div class="task-prioirity low" v-if="rank === 'low'">
      <svg width="14" height="8">
        <use :xlink:href="`#status-high`" />
      </svg>
      <p>Низкий</p>
    </div>

    <div class="task-prioirity mid" v-if="rank === 'medium'">
      <svg width="14" height="6">
        <use :xlink:href="`#status-mid`" />
      </svg>
      <p>Средний</p>
    </div>

    <div class="task-prioirity high" v-if="rank === 'high '">
      <svg width="14" height="8">
        <use :xlink:href="`#status-mid`" />
      </svg>
      <p>Высокий</p>
    </div>
  </div>
</template>

<script>
export default {
    props: {
    rank: String,
  }
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

  &.mid {
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