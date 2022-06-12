<template>
  <div class="board__item">
    <div class="user__name">
      <router-link :to="linkToUser"> {{ user.username }} </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      linkToUser: {
        name: "User",
        params: {
          userId: this.user.id,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.user__name {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  & a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    height: 100%;
    padding-top: 25px;
  }
}
</style>