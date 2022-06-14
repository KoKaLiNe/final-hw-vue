<template>
  <div class="card__wrap">
    <div class="card__col col-1">
      <p class="card__title">Исполнитель</p>
      <p class="card__text">{{ userAssignedName }}</p>

      <p class="card__title">Автор задачи</p>
      <p class="card__text">{{ userAuthorName }}</p>

      <p class="card__title">Тип запроса</p>
      <p class="card__text">{{ taskType }}</p>

      <p class="card__title">Приоритет</p>
      <p class="card__text">{{ taskRank }}</p>

      <p class="card__title">Дата создания</p>
      <p class="card__text">{{ dateOfCreation }}</p>

      <p class="card__title">Дата изменения</p>
      <p class="card__text">{{ dateOfUpdate }}</p>

      <p class="card__title">Затрачено времени</p>
      <p class="card__text">
        {{ taskTime }}
      </p>

      <CustomBtn :primaryBtn="true" @click="onClose()"
        >Сделать запись о работе
      </CustomBtn>
      <Modal v-show="isModalOpen">
        <template v-slot:header>
          <h3 class="modal__title">Запись о работе</h3>
        </template>
        <template v-slot:body>
          <form class="modal__field field" id="add-work-time-form">
            <label for="timeInMinutes" class="modal__label label"
              >Затраченное время
            </label>
            <CustomInput
              type="text"
              v-model="timeModal"
              :className="`input__modal input__title`"
              name="timeInMinutes"
              placeholder="Введите количество затраченного времени"
              required
            ></CustomInput>
            <label for="timeUnit" class="modal__label label"
              >Единицы измерения
            </label>
            <select
              v-model="timeUnit"
              class="modal__select select"
              name="timeUnit"
              id="timeUnit"
            >
              <option value="minute" checked>Минуты</option>
              <option value="hour">Часы</option>
              <option value="day">Дни</option>
            </select>

            <label for="timeComment" class="modal__label label"
              >Комментарий</label
            >
            <CustomTextarea
              type="text"
              v-model="timeComment"
              :className="`modal__textarea input`"
              name="timeComment"
              placeholder="Добавьте комментарий"
              spellCheck
            ></CustomTextarea>
          </form>
        </template>
        <template v-slot:footer>
          <div class="modal__footer-btns">
            <CustomBtn
              type="submit"
              class="btn-board__header"
              :primaryBtn="true"
              form="user-edit-form"
              @click="submit($event)"
            >
              Добавить
            </CustomBtn>
            <CustomBtn class="btn-board__header" @click="onClose()">
              Отмена
            </CustomBtn>
          </div>
        </template>
      </Modal>
    </div>

    <div class="card__col col-2">
      <p class="card__title">Описание</p>
      <p class="card__decription">{{ task.description }}</p>
    </div>

    <div class="card__col col-3">
      <form
        class="card__form"
        v-on:submit.prevent="sendComment()"
        id="add-task-comment"
      >
        <label for="comment" class="card__title label"
          >Комментарии ({{ comments.length }})
        </label>
        <CustomTextarea
          v-model="commentText"
          class="input__comment input"
          id="comment"
          type="text"
          name="comment"
          placeholder="Текст комментария"
          required
        ></CustomTextarea>
        <CustomBtn :successBtn="true" type="submit" form="add-task-comment">
          Добавить комментарий
        </CustomBtn>
      </form>
      <div class="card__comments">
        <TaskComment
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :users="users"
          :loggedUser="loggedUser"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { statuses, ranks, types } from "../common/const";
import moment from "moment";

export default {
  data() {
    return {
      statuses,
      ranks,
      types,
      commentText: "",
      isModalOpen: false,
      timeModal: "",
      timeUnit: "minute",
      timeComment: "",
    };
  },
  props: {
    taskId: String,
    task: Object,
    comments: Array,
    users: Array,
  },
  computed: {
    ...mapGetters("users", ["loggedUser"]),
    loggedUser() {
      return JSON.parse(localStorage.getItem("loggedUserInfo"));
    },
    taskType() {
      if (!_.isEmpty(this.task)) {
        return types[this.task.type].name;
      } else return "";
    },
    taskRank() {
      if (!_.isEmpty(this.task)) {
        return ranks[this.task.rank].name;
      } else return "";
    },
    assignedId() {
      if (!_.isEmpty(this.users))
        return this.users.find((user) => user.id === this.task.assignedId);
    },
    userAssignedName() {
      if (this.assignedId) {
        return this.assignedId.username;
      } else {
        return "загрузка...";
      }
    },
    userId() {
      return this.users.find((user) => user.id === this.task.userId);
    },
    userAuthorName() {
      if (this.userId) {
        return this.userId.username;
      }
      return "загрузка...";
    },
    dateOfCreation() {
      return moment(this.task.dateOfCreation).format("DD.MM.YYYY HH:MM");
    },
    dateOfUpdate() {
      return moment(this.task.dateOfUpdate).format("DD.MM.YYYY HH:MM");
    },
    taskTime() {
      let min = this.task.timeInMinutes;
      let hour = min / 60;
      let decCache = [],
        decCases = [2, 0, 1, 1, 1, 2];

      function decOfNum(number, titles) {
        if (!decCache[number])
          decCache[number] =
            number % 100 > 4 && number % 100 < 20
              ? 2
              : decCases[Math.min(number % 10, 5)];
        return titles[decCache[number]];
      }

      let fullTime =
        Math.floor(hour / 24) +
        " " +
        decOfNum(Math.floor(hour / 24), ["день", "дня", "дней"]) +
        " " +
        Math.floor(hour % 24) +
        " " +
        decOfNum(Math.floor(hour % 24), ["час", "часа", "часов"]) +
        " " +
        Math.floor(min % 60) +
        " " +
        decOfNum(Math.floor(min % 60), ["минута", "минуты", "минут"]);
      return fullTime;
    },
  },
  methods: {
    ...mapActions("tasks", ["fetchTaskComments", "addComment", "addWorktime"]),
    sendComment() {
      this.addComment({
        data: {
          taskId: this.taskId,
          userId: this.loggedUser.id,
          text: this.commentText,
        },
        taskId: this.taskId,
      }).then(() => {
        this.commentText = "";
      });
    },
    onClose() {
      this.isModalOpen = !this.isModalOpen;
    },
    submit(event) {
      event.preventDefault();
      if (this.timeUnit === "minute") {
        this.addWorktime({
          taskId: this.taskId,
          data: {
            timeInMinutes: this.timeModal,
            comment: this.timeComment,
            currentUser: this.loggedUser.id,
          },
        }).then(() => {
          this.timeModal = "";
          this.timeUnit = "minute";
          this.timeComment = "";
          this.onClose();
        });
      } else if (this.timeUnit === "hour") {
        this.addWorktime({
          taskId: this.taskId,
          data: {
            timeInMinutes: this.timeModal * 60,
            comment: this.timeComment,
            currentUser: this.loggedUser.id,
          },
        }).then(() => {
          this.timeModal = "";
          this.timeUnit = "minute";
          this.timeComment = "";
          this.onClose();
        });
      } else if (this.timeUnit === "day") {
        this.addWorktime({
          taskId: this.taskId,
          data: {
            timeInMinutes: this.timeModal * 60 * 24,
            comment: this.timeComment,
            currentUser: this.loggedUser.id,
          },
        }).then(() => {
          this.timeModal = "";
          this.timeUnit = "minute";
          this.timeComment = "";
          this.onClose();
        });
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.card {
  @include card;

  &__col.create {
    border-right: none;
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
