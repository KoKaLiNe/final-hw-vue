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
          <CustomBtn
            @click="onClose()"
            v-if="isLoggedUser"
            :class="`btn-board__header`"
            :primaryBtn="true"
            >Редактировать
          </CustomBtn>
          <Modal v-show="isModalOpen">
            <template v-slot:header>
              <h3 class="modal__title">Редактирование пользователя</h3>
            </template>
            <template v-slot:body>
              <form
                class="modal__field field"
                id="user-edit-form"
              >
                <label for="username" class="modal__label label"
                  >Имя пользователя
                </label>
                <CustomInput
                  type="text"
                  v-model="usernameModal"
                  :className="`input__modal input__title`"
                  name="username"
                  placeholder="Введите имя пользователя"
                  required
                ></CustomInput>
                <label for="urlpicture" class="modal__label label"
                  >URL фотографии
                </label>
                <CustomInput
                  type="url"
                  v-model="photoUrlModal"
                  :className="`input__modal input__title`"
                  name="photoUrl"
                  placeholder="Введи URL изображения"
                  required
                ></CustomInput>

                <label for="about" class="modal__label label">О себе </label>
                <CustomTextarea
                  type="text"
                  v-model="aboutUserModal"
                  :className="`modal__textarea input`"
                  name="about"
                  placeholder="Расскажите о себе"
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
  data() {
    return {
      isModalOpen: false,
      usernameModal: "",
      photoUrlModal: "",
      aboutUserModal: "",
    };
  },
  props: {
    userId: String,
  },
  computed: {
    ...mapGetters("tasks", ["tasks"]),
    ...mapGetters("users", ["usersLoading", "currentUser", "loggedUser"]),
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
      return this.userId === this.loggedUser.id;
    },
  },
  methods: {
    ...mapActions("tasks", ["fetchAllTasks"]),
    ...mapActions("users", [
      "getCurrentUser",
      "editUser",
      "getLoggedUser",
      "setLoggedUser",
    ]),
    addTask() {
      this.$router.push({
        name: "UserAddTask",
      });
    },
    onClose() {
      this.isModalOpen = !this.isModalOpen;
      this.usernameModal = this.loggedUser.username || null;
      this.photoUrlModal = this.loggedUser.photoUrl || null;
      this.aboutUserModal = this.loggedUser.about || null;
    },
    submit(event) {
      event.preventDefault();

      this.editUser({
        data: {
          id: this.loggedUser.id,
          login: this.loggedUser.login,
          username: this.usernameModal,
          about: this.aboutUserModal,
          photoUrl: this.photoUrlModal,
          password: JSON.parse(localStorage.getItem("userPassword")),
        },
      })
        .then(() => {
          this.getLoggedUser({
            login: this.loggedUser.login,
            password: JSON.parse(localStorage.getItem("userPassword")),
          }).then((data) => {
            if (data.status === 200) {
              this.setLoggedUser(data.data);
              localStorage.setItem("loggedUserInfo", JSON.stringify(data.data));
            }
          });
        })
        .then(() => {
          this.isModalOpen = false;
        });
    },
  },
  mounted() {
    this.getCurrentUser(this.userId);
    this.fetchAllTasks();
    this.usernameModal = this.loggedUser.username || null;
    this.photoUrlModal = this.loggedUser.photoUrl || null;
    this.aboutUserModal = this.loggedUser.about || null;
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;
}
</style>
