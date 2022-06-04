<template>
  <div>
    <span class="task-status open" v-if="status === 'opened'"> Открыто </span>
    <span class="task-status working" v-else-if="status === 'inProgress'">В работе</span>
    <span class="task-status testing" v-else-if="status === 'testing'">Тестирование</span>
    <span class="task-status complite" v-else-if="status === 'complete'">Сделано</span>
  </div>
</template>

<script>
export default {
  props: {
    status: String,
  }
}
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

    background-color: #CCCCCC;
    color: #333333;
    border: 1px solid #333333;
    border-radius: 5px;

    &.working, &.testing, &.complite {
        @include task-status (#FFC700, #846F00, #846F00);
    }
    
    &.testing {
        width: 113px;
    }

    &.complite {
        @include task-status (#4BD379, #157536, #157536);
    }
}
</style>