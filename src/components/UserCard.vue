<template>
  <div v-if="isLoading" class="card__wrap">
    <div class="card__col col-1">
      <div class="card__user-img-wrapper">
        <img
          class="card__user-img"
          :src="setUserPicture"
          width="182"
          height="182"
          alt="Изображение профиля"
        />
      </div>
      <h4 class="card__title">О себе</h4>
      <p class="card__title">{{ user.about }}</p>
    </div>
    <div class="card__col col-2 user--card">
      <p class="card__title">Задачи</p>
      <div class="board__list">
        <TaskItem
          v-for="task in paginatedData"
          :key="task.id"
          :taskId="task.id"
          :users="user"
          :currentTask="task"
          :status="task.status"
          :userId="userId"
        />
      </div>
      <Pagination
        v-if="tasks.length > 0"
        :dataSize="tasks.length"
        :itemsOnPage="itemsOnPage"
        :firstItem="firstItem"
        :currentPage="currentPage"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @handleChangePage="handleChangePage"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      currentPage: 0,
      itemsOnPage: 10,
    };
  },
  props: {
    user: Object,
    tasks: Array,
    userId: String,
  },
  computed: {
    ...mapGetters("users", ["usersLoading", "currentUser"]),

    isLoading() {
      if (!this.usersLoading) {
        return true;
      } else return false;
    },
    firstItem() {
      return this.currentPage * this.itemsOnPage;
    },
    lastItem() {
      return this.firstItem + this.itemsOnPage;
    },
    paginatedData() {
      return this.tasks.slice(this.firstItem, this.lastItem);
    },
    setUserPicture() {
      if (this.user.photoUrl === null || this.user.photoUrl === undefined) {
        return "./static/images/defualt-user-icon.png";
      } else return this.user.photoUrl;
    },
  },
  methods: {
    ...mapActions("tasks", ["fetchTasks"]),
    nextPage() {
      this.currentPage++;
    },
    prevPage() {
      this.currentPage--;
    },
    handleChangePage(index) {
      this.currentPage = index - 1;
    },
  },
  mounted() {
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
}
</style>