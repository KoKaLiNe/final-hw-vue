<template>
  <div class="root">
    <div class="pagination">
      <Pager
        :dataSize="dataSize"
        :itemsOnPage="itemsOnPage"
        :firstItem="firstItem"
        :totalPages="totalPages"
        :currentPage="currentPage"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @handleChangePage="handleChangePage"
      />
      <span class="pagination__count"
        >Показано {{ currentPage * itemsOnPage + 1 }} - {{ shownTasks() }} из
        {{ dataSize }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    currentPage: {
      type: Number,
      default: 0,
    },
    dataSize: Number,
    itemsOnPage: {
      type: Number,
      default: 10,
    },
    firstItem: Number,
  },
  computed: {
    totalPages() {
      if (this.dataSize > 0) return Math.ceil(this.dataSize / this.itemsOnPage);
      else return 0;
    },
  },
  methods: {
    activeBtn(index) {
      return this.currentPage === index - 1;
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
    shownTasks() {
      if (
        this.currentPage + 1 ===
        Math.ceil(this.dataSize / this.itemsOnPage)
      ) {
        return this.dataSize;
      } else {
        return (this.currentPage + 1) * this.itemsOnPage;
      }
    },
  },
  mounted() {
    this.filter;
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  @include flexible;
  align-items: center;
  flex-direction: row;
  vertical-align: middle;

  &__count {
    color: $innerShadowColor;
  }
}
</style>
