<template>
  <section class="main__wrapper">
    <section class="board">
      <div class="board__header">
        <h2 class="board__header-title user-title">{{ editTitle }}</h2>
        <div class="board__header-btns">
          <CustomBtn
            class="btn-board__header"
            :primaryBtn="true"
            form="add-task-form"
          >
            Сохранить
          </CustomBtn>
          <CustomBtn class="btn-board__header" @click="cancelChange()">
            Отмена
          </CustomBtn>
        </div>
      </div>

      <section class="board__content">
        <Spinner v-if="isLoading" class="spinner" line-fg-color="#7B61FF" />

        <div v-if="!isLoading" class="card__wrap">
          <div class="card__col col-1">
            <form
              class="field"
              id="add-task-form"
              v-on:submit.prevent="saveData()"
            >
              <label for="assignedUser" class="label">Исполнитель </label>
              <select
                class="card__select select"
                name="assignedId"
                default
                v-model="taskAssignedId"
              >
                <option
                  v-for="user in users"
                  :key="user.id"
                  :name="user.assignedId"
                  :value="user.id"
                >
                  {{ user.username }}
                </option>
              </select>

              <label for="type" class="label">Тип запроса </label>
              <select
                class="card__select select"
                name="type"
                v-model="taskType"
              >
                <option value="task">Задача</option>
                <option value="bug">Ошибка</option>
              </select>

              <label for="status" class="label">Приоритет </label>
              <select
                class="card__select select"
                name="rank"
                v-model="taskStatus"
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </form>
          </div>

          <div class="card__col col-2 create">
            <form class="card__field field" id="add-task-form">
              <label for="title" class="label">Название </label>
              <CustomTextarea
                typeof="text"
                class="input__title input"
                name="title"
                placeholder="Введите название задачи"
                maxLength="124"
                v-model="taskTitle"
                spellCheck
                required
              ></CustomTextarea>
              <label for="" class="label">Описание </label>
              <CustomTextarea
                typeof="text"
                class="input__card-description input"
                name="description"
                placeholder="Введите описание задачи"
                v-model="taskDescription"
                spellCheck
                required
              ></CustomTextarea>
            </form>
          </div>
          <div class="card__col col-3"></div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { loggedUser } from "../common/const";
import Spinner from "vue-simple-spinner";

export default {
  components: { Spinner },
  props: {
    taskId: String,
    userId: String,
  },
  data() {
    return {
      loggedUser,
      id: "",
      taskTitle: "",
      taskDescription: "",
      taskAssignedId: "",
      taskType: "",
      taskStatus: "",
    };
  },
  computed: {
    ...mapGetters("tasks", ["tasksLoading", "tasks", "currentTask"]),
    ...mapGetters("users", ["usersLoading", "users"]),
    isLoading() {
      if (this.tasksLoading && this.usersLoading) {
        return true;
      }
    },
    editTitle() {
      return this.taskId ? "Редактирование" : "Создание";
    },
    taskAssignedIdFill() {
      if (this.taskId) {
        return this.currentTask.assignedId;
      } else if (this.userId) {
        return this.userId;
      } else if (!this.taskId && !_.isEmpty(this.users)) {
        return this.users[0].id;
      }
    },
    taskTitleFill() {
      if (this.taskId) {
        return this.currentTask.title;
      }
      return "";
    },
    taskDescriptionFill() {
      if (this.taskId) {
        return this.currentTask.description;
      }
      return "";
    },
    taskTypeFill() {
      if (this.taskId) {
        return this.currentTask.type;
      }
      return "task";
    },
    taskStatusFill() {
      if (this.taskId) {
        return this.currentTask.rank;
      }
      return "low";
    },
    dateOfCreation() {
      return this.currentTask.dateOfCreation;
    },
  },
  methods: {
    ...mapActions("tasks", ["fetchTasks", "editTask", "getCurrentTask"]),
    ...mapActions("users", ["setUsersLimit"]),
    saveData() {
      this.editTask({
        id: this.id,
        userId: this.loggedUser.id,
        assignedId: this.taskAssignedId,
        title: this.taskTitle,
        description: this.taskDescription,
        type: this.taskType,
        dateOfCreation: new Date(),
        dateOfUpdate: new Date(),
        rank: this.taskStatus,
      })
        .then(() => {
          if (this.taskId) this.getCurrentTask(this.taskId);
        })
        .then(() => history.back());
    },
    fillInputData() {
      this.id = (this.taskId && this.currentTask.id) || "";
      this.taskTitle = this.taskTitleFill;
      this.taskDescription = this.taskDescriptionFill;
      this.taskAssignedId = this.taskAssignedIdFill;
      this.taskType = (this.taskId && this.taskTypeFill) || "task";
      this.taskStatus = (this.taskId && this.taskStatusFill) || "low";
    },
    cancelChange() {
      history.back();
    },
  },
  mounted() {
    if (this.taskId) {
      this.getCurrentTask(this.taskId).then(() =>
        this.setUsersLimit(0).then(() => this.fillInputData())
      );
    } else {
      this.fetchTasks().then(() =>
        this.setUsersLimit(0).then(() => this.fillInputData())
      );
    }
  },
};
</script>

<style lang="scss" scoped>
.card {
  @include card;

  &__col.create {
    border-right: none;
  }

  &__user-img {
    width: 182px;
    height: 182px;
    @include border-radius(50%);
    cursor: pointer;

    &-wrapper {
      width: 186px;
      height: 186px;
      background: conic-gradient(
        #ff6161,
        #7b61ff,
        #ff6161,
        #7b61ff,
        #ff6161,
        #7b61ff,
        #ff6161
      );
      padding: 2.3px;
      @include border-radius(50%);
      margin-bottom: 20px;
    }
  }

  &__title {
    color: $labelFontColor;
    margin-bottom: 8px;
  }

  &__text {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 5px;
    }
  }

  &__decription {
    margin-bottom: 20px;
    line-height: 19px;
    text-indent: 20px;
    white-space: pre-line;
  }

  &__form {
    margin-bottom: 20px;
  }

  &__comments {
    max-height: 555px;
    overflow-y: auto;
  }
}
</style>