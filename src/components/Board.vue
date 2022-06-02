<template>
  <section class="board">
    <!-- <div class="board__header">
      <h2 class="board__header-title">Задачи</h2>
      <CustomBtn :primaryBtn="true">
        <a href="#" class="btn-link">Добавить задачу</a>
      </CustomBtn>
    </div>
    <section class="board__content">
      <TasksFilter :tasks="tasks" :users="users" />
      <div class="board__list">
        <TaskItem
          v-for="task in tasks"
          :key="task.id"
          :users="users"
          :currentTask="task"
        />
      </div>
      <Pagination
        :dataSize="tasks.length"
        :itemsOnPage="itemsOnPage"
        :firstItem="firstItem"
        :totalPages="totalPages"
      />
    </section> -->
  </section>
</template>

<script>
// export default {
//   props: {
//     tasks: Array,
//     users: Array,
//   },
//   data() {
//     return {
//       currentPage: 0,
//       itemsOnPage: 10,
//     };
//   },
//   computed: {
//     firstItem() {
//       return this.currentPage * this.itemsOnPage;
//     },
//     lastItem() {
//       return this.firstItem + this.itemsOnPage;
//     },
//     totalPages() {
//       return Math.ceil(this.tasks.length / this.itemsOnPage);
//     },
//     paginatedData() {
//       return this.dataArray.slice(this.firstItem, this.lastItem);
//     },
//   },
// };
</script>

<style lang="scss" scoped>


// .board {
//   width: 100%;
//   max-width: 1280px;
//   margin-top: 30px;

//   &__header {
//     font-family: "Roboto", sans-serif;
//     @include flexible;
//     align-items: center;
//     margin-bottom: 20px;

//     &-title {
//       @include font($size: 24px, $weight: 300);

//       &.task-title {
//         display: flex;
//         flex-direction: row;
//         align-items: center;
//         margin-right: 10px;
//       }
//     }

//     &-text {
//       margin-right: 10px;
//       white-space: nowrap;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       max-width: 410px;
//       cursor: default;
//     }

//     &-btns {
//       text-align: end;
//     }
//   }

//   //   &__filter {
//   // display: flex;
//   // flex-direction: row;
//   // justify-content: space-between;
//   // margin-bottom: 20px;
//   //   }

//   &__content {
//     display: flex;
//     flex-direction: column;
//     height: 755px;
//     background-color: $boardBGColor;
//     padding: 20px;
//     @include border-radius(5px);
//     box-shadow: 0 0 5px #b5b5b5;
//   }

//   &__list {
//     display: flex;
//     flex-direction: column;
//     height: 100%;
//     margin-bottom: 18px;
//     position: relative;

//     @include border-radius(10px);

//     &:after {
//       content: "";
//       width: calc(100% + 20px);
//       height: calc(100% + 20px);
//       position: absolute;
//       top: -10px;
//       left: -10px;
//       box-sizing: border-box;
//       @include border-radius(17px);
//       border: 10px solid $boardBGColor;
//       box-shadow: inset 0 0 5px #b5b5b5;
//       pointer-events: none;
//     }
//   }
// }
</style>