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
          <CustomBtn class="btn-board__header"> Отмена </CustomBtn>
        </div>
      </div>

      <section class="board__content">
        <div class="card__wrap">
          <div class="card__col col-1">
            <form class="field" onSubmit="{handleSubmit}">
              <label for="assignedUser" class="label">Исполнитель </label>
              <select
                class="card__select select"
                name="assignedId"
                default
                v-model="taskUser"
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
export default {
  props: {
    taskId: String,
  },
  data() {
    return {
      tasks: [
        {
          id: "6283fbbfb92d7606a744d81e",
          userId: "6273dca5d09b551dca87629c",
          assignedId: "6273dca5d09b551dca87629c",
          title: "as",
          description: "sdasdasd",
          type: "bug",
          dateOfCreation: "2022-05-17T19:47:11.349Z",
          dateOfUpdate: "2022-05-29T16:22:22.400Z",
          timeInMinutes: 7561,
          status: "complete",
          rank: "low",
        },
        {
          id: "628588a978a8556d50224c89",
          userId: "6273dca5d09b551dca87629c",
          assignedId: "6273dca5d09b551dca87629c",
          title: "12qwe",
          description: "12qwe",
          type: "task",
          dateOfCreation: "2022-05-19T00:00:41.707Z",
          dateOfUpdate: "2022-05-29T16:23:15.993Z",
          timeInMinutes: 7387983,
          status: "testing",
          rank: "medium",
        },
        {
          id: "6286521778a8556d50224c9e",
          userId: "6273dca5d09b551dca87629c",
          assignedId: "6273dca5d09b551dca87629c",
          title: "wer",
          description: "wer",
          type: "bug",
          dateOfCreation: "2022-05-19T14:20:07.403Z",
          dateOfUpdate: "2022-05-28T19:59:58.952Z",
          timeInMinutes: 1342,
          status: "testing",
          rank: "low",
        },
      ],
      users: [
        {
          id: "6273dca5d09b551dca87629c",
          login: "SPB_Alexey_Kutilov",
          password: "123",
          username: "Алексей Кутилов",
          about: "",
          photoUrl: "",
        },
        {
          id: "6273dcb7d09b551dca87629d",
          login: "Alexius04",
          password: "123",
          username: "AlexDev04",
          about: "WTF is your Python? \nIt's JavaScript, Bro!",
          photoUrl:
            "https://as-ecars.ru/wp-content/uploads/2019/06/electric-scooter-super-soco-02_1157353144.jpg",
        },
        {
          id: "6273dcd2d09b551dca87629e",
          login: "maxigroove",
          password: "1Q2w3e4r5t",
          username: "Артем Сорокин",
          about: "Во славу Императору!",
          photoUrl:
            "https://avatars.mds.yandex.net/get-zen_doc/3994559/pub_6064c0224878ca659c8c08b6_6064cbccd5b01e21343bb760/scale_1200",
        },
      ],
      taskTitle: "",
      taskDescription: "",
      taskUser: "",
      taskType: "task",
      taskStatus: "low",
    };
  },
  computed: {
    editTitle() {
      if (this.taskId) {
        return "Редактирование";
      }
      return "Создание";
    },
    currentTask() {
      if (this.taskId)
        return this.tasks.find((task) => task.id === this.taskId);
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
    taskUserFill() {
      if (this.taskId) {
        return this.currentTask.assignedId;
      }
      return this.users[0].id;
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
  },
  mounted() {
    this.taskTitle = this.taskTitleFill;
    this.taskDescription = this.taskDescriptionFill;
    this.taskUser = this.taskUserFill;
    this.taskType = this.taskTypeFill;
    this.taskStatus = this.taskStatusFill;
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