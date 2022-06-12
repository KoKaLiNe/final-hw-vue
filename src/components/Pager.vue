<template>
  <div v-if="isDataLoaded" class="pagination__inner">
    <CustomBtn
      class="btn-pagination"
      title="Назад"
      :disabled="isPrevBtnDisabled"
      @click="prevPage"
      >Назад</CustomBtn
    >
    <CustomBtn
      v-for="page in totalPages"
      :key="page"
      class="btn-pagination"
      :class="{ active: activeBtn(page) }"
      :title="page"
      :value="page"
      @click="handleChangePage(page)"
      >{{ page }}</CustomBtn
    >
    <CustomBtn
      class="btn-pagination"
      title="Вперед"
      :disabled="isNextBtnDisabled"
      @click="nextPage"
      >Вперед</CustomBtn
    >
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dataSize: Number,
    currentPage: {
      type: Number,
      default: 0,
    },
    firstItem: Number,
    totalPages: Number,
  },
  data() {
    return {
      lastItem: this.firstItem + this.dataSize,
    };
  },
  computed: {
    isDataLoaded() {
      return this.totalPages > 0;
    },
    isPrevBtnDisabled() {
      return this.currentPagerPage === 0;
    },
    isNextBtnDisabled() {
      return this.currentPagerPage === this.totalPages - 1;
    },
    currentPagerPage() {
      return this.currentPage;
    },
  },
  methods: {
    activeBtn(page) {
      return this.currentPage === page - 1;
    },
    nextPage() {
      this.$emit("nextPage");
    },
    prevPage() {
      this.$emit("prevPage");
    },
    handleChangePage(page) {
      this.$emit("handleChangePage", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  &-pagination {
    margin-right: 5px;
    padding: 0 7.5px;

    &.active {
      @include btn-primary;
      cursor: default;
    }

    &:disabled {
      @include btn-disabled;
      cursor: default;
    }
  }
}
</style>