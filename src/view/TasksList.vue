<template>
  <section class="main__wrapper">
    <section class="board">
      <div class="board__header">
        <h2 class="board__header-title">Задачи</h2>
        <CustomBtn :primaryBtn="true" @click="addTask()"
          >Добавить задачу
        </CustomBtn>
      </div>
      <section class="board__content">
        <TasksFilter v-if="isDataLoaded" :tasks="tasks" :users="users" />
        <div class="board__list">
          <Spinner
            v-if="!isDataLoaded"
            class="spinner"
            line-fg-color="#7B61FF"
          />
          <TaskItem
            v-else-if="isDataLoaded"
            v-for="task in tasks"
            :key="task.id"
            :taskId="task.id"
            :users="users"
            :currentTask="task"
            :status="task.status"
          />
        </div>
        <Pagination
          v-if="isDataLoaded"
          :dataSize="tasksTotal"
          :itemsOnPage="tasksLimit"
          :firstItem="firstItem"
          :currentPage="tasksPage"
          @nextPage="nextPage"
          @prevPage="prevPage"
          @handleChangePage="handleChangePage"
        />
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Spinner from "vue-simple-spinner";

export default {
  components: { Spinner },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("tasks", [
      "tasksLoading",
      "tasks",
      "tasksFilter",
      "tasksPage",
      "tasksLimit",
      "tasksTotal",
      "currentTask",
    ]),
    ...mapGetters("users", [
      "loggedUser",
      "usersLoading",
      "users",
      "usersFilter",
      "usersPage",
      "usersLimit",
      "usersTotal",
    ]),
    isDataLoaded() {
      if (!(this.tasksLoading && this.usersLoading)) return true;
    },
    firstItem() {
      return this.tasksPage * this.tasksLimit;
    },

  },
  methods: {
    ...mapActions("tasks", ["fetchTasks", "setCurrentPage"]),
    ...mapActions("users", ["fetchUsers", "setUsersLimit"]),

    addTask() {
      this.$router.push({ name: "AddTask"});
    },
    nextPage() {
      this.setCurrentPage(this.tasksPage + 1);
    },
    prevPage() {
      this.setCurrentPage(this.tasksPage - 1);
    },
    handleChangePage(index) {
      this.setCurrentPage(index - 1);
    },
  },
  mounted() {
    this.fetchTasks();
    this.setUsersLimit(0);
  },
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
.spinner {
  margin-top: 25%;
}
</style>