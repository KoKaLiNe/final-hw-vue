<template>
  <section class="main__header">
    <svg width="120" height="20">
      <use :xlink:href="'#logo'" />
    </svg>
    <section class="main__header-wrap" v-if="!error404">
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
            <span class="main__user-name">Неопознанный гусь</span>
            <div class="main__user-img-wrapper">
              <img
                class="main__user-img"
                src="../assets/images/defualt-user-icon.png"
                width="40"
                height="40"
                alt="Изображение профиля"
              />
            </div>
          </div>
        </template>
        <template v-slot:dropdown-content>
          <a href="#" class="dropdown-link">Посмотреть профиль</a>
          <a class="dropdown-link accent">Выйти из системы</a>
        </template>
      </Dropdown>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    error404: Boolean,
  },
  data() {
    return {
      isActive: false,
      linkToTaskList: {
        name: "TaskList",
        params: {
          // page: "tasks-List",
        },
      },
      linkToTaskUsers: {
        name: "UsersList",
        params: {
          page: "users",
        },
      },
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.$emit("toggle");
    },
  },
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