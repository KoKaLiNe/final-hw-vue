<template>
  <section class="main__wrapper">
    <section class="board">
      <div class="board__header">
        <h2 class="board__header-title user-title">
          {{ currentUser.username }}
        </h2>
        <div class="board__header-btns">
          <CustomBtn :class="`btn-board__header`" @click="addTask()">
            Добавить задачу
          </CustomBtn>
          <CustomBtn v-if="isLoggedUser" :class="`btn-board__header`" :primaryBtn="true"
            >Редактировать
          </CustomBtn>
        </div>
      </div>
      <section class="board__content">
        <Spinner v-if="!isLoading" class="spinner" line-fg-color="#7B61FF" />
        <section v-if="isLoading" class="card">
          <UserCard :user="currentUser" :tasks="usersTasks" :userId="userId" />
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
    userId: String,
  },
  computed: {
    ...mapGetters("tasks", ["tasks"]),
    ...mapGetters("users", ["usersLoading", "currentUser"]),
    isLoading() {
      if (!this.usersLoading && this.tasks.length > 0) {
        return true;
      } else return false;
    },
    usersTasks() {
      if (!_.isEmpty(this.tasks))
        return this.tasks.filter((tasks) => tasks.assignedId === this.userId);
    },
    isLoggedUser() {
      return this.userId === JSON.parse(localStorage.getItem("loggedUserInfo")).id
    }
  },
  methods: {
    ...mapActions("tasks", ["fetchAllTasks"]),
    ...mapActions("users", ["getCurrentUser"]),
    addTask() {
      this.$router.push({
        name: "UserAddTask",
        // params: { userId: userId },
      });
    },
  },
  mounted() {
    this.getCurrentUser(this.userId);
    this.fetchAllTasks();
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}
</style>
