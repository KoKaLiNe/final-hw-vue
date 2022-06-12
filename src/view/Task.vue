<template>
  <section class="main__wrapper">
    <section class="board">
      <div class="board__header task-header">
        <div class="board__header-title task-title">
          <h2
            v-if="!isLoading"
            class="board__header-text"
            :title="currentTask.title"
          >
            {{ currentTask.title }}
          </h2>
          <TaskStatus :status="currentTask.status" />
        </div>
        <div class="board__header-btns">
          <StatusBtns :taskId="taskId" :status="currentTask.status" />
          <CustomBtn
            :class="`btn-board__header`"
            :primaryBtn="true"
            @click="editTask(currentTask.id)"
          >
            Редактировать
          </CustomBtn>
          <CustomBtn
            :class="'btn-board__header'"
            :errorBtn="true"
            :type="`submit`"
            @click="handleDelete()"
          >
            Удалить
          </CustomBtn>
        </div>
      </div>

      <section class="board__content">
        <section class="card">
          <Spinner v-if="isLoading" class="spinner" line-fg-color="#7B61FF" />
          <TaskCard v-if="!isLoading" :task="currentTask" :users="users" />
        </section>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Spinner from "vue-simple-spinner";

export default {
  components: { Spinner },
  props: {
    taskId: String,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("tasks", ["tasksLoading", "tasks", "currentTask"]),
    ...mapGetters("users", ["usersLoading", "users"]),
    isLoading() {
      if (this.tasksLoading && this.usersLoading) {
        return true;
      }
    },
  },
  methods: {
    ...mapActions("tasks", ["getCurrentTask", "deletTask"]),
    ...mapActions("users", ["fetchUsers", "setUsersLimit"]),
    handleDelete() {
      console.log("метод удаления");
    },
    editTask() {
      this.$router.push({
        name: "EditTask",
        params: { taskId: this.taskId },
      });
    },
    handleDelete() {
      this.deletTask(this.taskId);
      this.$router.push({ name: "TaskList" });
    },
  },
  mounted() {
    this.getCurrentTask(this.taskId);
    this.setUsersLimit(0);
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}

.comment {
  margin-bottom: 20px;

  &__title {
    @include flexible;
    align-items: center;
    color: $labelFontColor;
    margin-bottom: 5px;
  }
}
</style>