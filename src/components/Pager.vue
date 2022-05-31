<template>
  <div class="pagination__inner">
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
  props: {
    itemsOnPage: {
      type: Number,
      default: 10,
    },
    firstItem: Number,
    totalPages: Number,
  },
  data() {
    return {
      currentPage: 0,
      lastItem: this.firstItem + this.itemsOnPage,
    };
  },
  computed: {
    isPrevBtnDisabled() {
      return this.currentPage === 0 
    },
    isNextBtnDisabled() {
      return this.currentPage === this.totalPages - 1
    },
  },
  methods: {
    activeBtn(page) {
      return this.currentPage === page - 1;
    },
    nextPage() {
      console.log(this.currentPage);
      this.currentPage++;
      this.$emit("nextPage", this.currentPage);
    },
    prevPage() {
      this.currentPage--;
      this.$emit("prevPage", this.currentPage);
    },
    handleChangePage(page) {
      this.currentPage = page - 1;
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