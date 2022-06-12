<template>
  <section class="main__wrapper">
    <section class="board">
      <div class="board__header">
        <h2 class="board__header-title">Пользователи</h2>
      </div>
      <section class="board__content">
        <Spinner v-if="usersLoading" class="spinner" line-fg-color="#7B61FF" />
        <div v-if="!usersLoading" class="board__list">
          <UserItem
            v-for="user in users"
            :key="user.id"
            :user="user"
            :currentUser="user"
          />
        </div>
        <Pagination
          v-if="!usersLoading"
          :dataSize="usersTotal"
          :itemsOnPage="usersLimit"
          :firstItem="firstItem"
          :currentPage="usersPage"
          @nextPage="nextPage"
          @prevPage="prevPage"
          @handleChangePage="handleChangePage"
        />
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
      currentPage: 0,
      itemsOnPage: 10,
    };
  },
  computed: {
    ...mapGetters("users", [
      "usersLoading",
      "users",
      "usersPage",
      "usersLimit",
      "usersTotal",
    ]),
    isDataLoaded() {
      return !this.usersLoading && this.usersTotal > 0 && this.users.length > 0;
    },
    firstItem() {
      return this.currentPage * this.itemsOnPage;
    },
  },
  methods: {
    ...mapActions("users", [
      "fetchUsers",
      "setCurrentUserPage",
      "setUsersLimit",
    ]),
    nextPage() {
      this.setCurrentUserPage(this.usersPage + 1);
    },
    prevPage() {
      this.setCurrentUserPage(this.usersPage - 1);
    },
    handleChangePage(index) {
      this.setCurrentUserPage(index - 1);
    },
  },
  mounted() {
    this.setUsersLimit(10);
  },
};
</script>

<style lang="scss" scoped>
//
</style>