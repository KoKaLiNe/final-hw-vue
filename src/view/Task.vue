<template>
  <section class="main__wrapper">
    <section class="board">
      <div class="board__header task-header">
        <div class="board__header-title task-title">
          <h2 class="board__header-text" title="">{{ currentTask.title }}</h2>
          <TaskStatus :status="currentTask.status" />
        </div>
        <div class="board__header-btns">
          <StatusBtns :class="`btn-board__header`" :status="currentTask.status" />
          <CustomBtn
            :class="`btn-board__header`"
            :primaryBtn="true"
            @click="editTask()"
          >
            Редактировать
          </CustomBtn>
          <CustomBtn
            :class="'btn-board__header'"
            :errorBtn="true"
            :type="`submit`"
            @click="handleDelete"
          >
            Удалить
          </CustomBtn>
        </div>
      </div>

      <section class="board__content">
        <section class="card">
          <TaskCard :task="currentTask" :users="users" />
        </section>
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
    };
  },
  computed: {
    currentTask() {
      return this.tasks.find((task) => task.id === this.taskId);
    },
  },
  methods: {
    handleDelete() {
      console.log("метод удаления");
    },
    editTask() {
      this.$router.push({
        name: "EditTask",
        params: { taskId: this.taskId },
      });
    },
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