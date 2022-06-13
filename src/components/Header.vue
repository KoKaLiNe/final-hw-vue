<template>
  <section class="main__header">
    <svg width="120" height="20">
      <use :xlink:href="'#logo'" />
    </svg>
    <section class="main__header-wrap" v-if="!isLoginOrError">
      <div class="main__header-group-link">
        <router-link
          :to="linkToTaskList"
          class="main__lnk task-lnk"
          active-class="active"
          >Задачи</router-link
        >
        <router-link
          :to="linkToTaskUsers"
          class="main__lnk task-lnk"
          active-class="active"
          >Пользователи</router-link
        >
      </div>
      <Dropdown :classContent="`user-menu`">
        <template v-slot:dropdown-btn>
          <div class="dropdown-btn__user">
            <span class="main__user-name">{{ loggedUser.username }}</span>
            <div class="main__user-img-wrapper">
              <img
                class="main__user-img"
                :src="profileImage"
                width="40"
                height="40"
                alt="Изображение профиля"
              />
            </div>
          </div>
        </template>
        <template v-slot:dropdown-content>
          <router-link :to="linkToUser" class="dropdown-link"
            >Посмотреть профиль</router-link
          >
          <button to="#" @click="loggedOut()" class="dropdown-link accent">
            Выйти из системы
          </button>
        </template>
      </Dropdown>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    error404: Boolean,
    loginForm: Boolean,
  },
  data() {
    return {
      isActive: false,
      linkToTaskList: {
        name: "TaskList",
      },
      linkToTaskUsers: {
        name: "UsersList",
        params: {
          page: "users",
        },
      },
      linkToUser: {
        name: "User",
        params: {
          userId: JSON.parse(localStorage.getItem("loggedUserInfo")).id,
        },
      },
    };
  },
  computed: {
    isLoginOrError() {
      return this.error404 || this.loginForm;
    },
    loggedUser() {
      return JSON.parse(localStorage.getItem("loggedUserInfo"));
    },
    profileImage() {
      if (
        this.loggedUser.photoUrl === null ||
        this.loggedUser.photoUrl === undefined
      ) {
        console.log("картинки нет");
        return "./static/images/defualt-user-icon.png";
      } else {
        return this.loggedUser.photoUrl;
      }
    },
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.$emit("toggle");
    },
    loggedOut() {
      localStorage.removeItem("loggedUserInfo");
      localStorage.removeItem("userPassword");
      this.$router.replace({ name: "Login" });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.main {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;

    background-color: $boardBGColor;
    padding: 8px 0 8px 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: relative;
    z-index: 10;

    &-wrap {
      width: 60%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__lnk {
    font-family: "Open Sans", sans-serif;
    @include font($size: 24px, $weight: false);
    text-decoration: none;
    margin-right: 10px;
    padding-bottom: 12px;
    color: $fontColor;
  }

  &__user {
    &-name {
      font-family: "Roboto", sans-serif;
      @include font($size: 16px, $weight: false);
      margin-right: 10px;
    }

    &-img {
      width: 40px;
      height: 40px;
      @include border-radius(50%);
      cursor: pointer;

      &-wrapper {
        max-width: 42px;
        max-height: 42px;
        background: conic-gradient(
          #ff6161,
          #7b61ff,
          #ff6161,
          #7b61ff,
          #ff6161,
          #7b61ff,
          #ff6161
        );
        padding: 1px;
        @include border-radius(50%);
      }
    }
  }
}
.dropdown {
  cursor: pointer;
  position: relative;
}
.user-list {
  width: 136px;
  min-height: 40px;
  height: 40px;
  top: 42px;
  right: 0;
}

.active {
  border-bottom: 2px;
  border-style: solid;
  border-color: $primaryColor;
}
</style>