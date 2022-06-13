<template>
  <div class="card__comment comment">
    <div class="comment__title">
      <p class="comment__user-name">
        {{ commentAuthor }}
        ({{ dateOfCreation }})
      </p>
      <CustomBtn
        v-if="isLogdegUser"
        @click="deletThisComment()"
        type="button"
        class="btn__comment btn-link currentUser"
      >
        Удалить
      </CustomBtn>
    </div>
    <p class="comment__text">{{ comment.text }}</p>
  </div>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  props: {
    comment: Object,
    loggedUser: Object,
    users: Array,
  },
  computed: {
    commentAuthor() {
      if (this.users.find((user) => user.id === this.comment.userId)) {
        return this.users.find((user) => user.id === this.comment.userId)
          .username;
      }
      return "Не указан";
    },
    isLogdegUser() {
      return this.loggedUser.id === this.comment.userId;
    },
    dateOfCreation() {
      return moment(this.comment.dateOfUpdate).format("DD.MM.YYYY HH:MM");
    },
  },
  methods: {
    ...mapActions("tasks", ["deletComment"]),
    deletThisComment() {
      this.deletComment({ id: this.comment.id, taskId: this.$route.params.taskId });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.card {
  .comment {
    margin-bottom: 20px;

    &__title {
      @include flexible;
      align-items: center;
      color: $labelFontColor;
      margin-bottom: 5px;
    }
  }
}
</style>