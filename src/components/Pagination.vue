<template>
  <div class="root">
    <div class="pagination">
      <Pager
        :dataSize="dataSize"
        :itemsOnPage="itemsOnPage"
        :firstItem="firstItem"
        :totalPages="totalPages"
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
    return {
      currentPage: 0,
      lastItem: this.firstItem + this.size,
    };
  },
  props: {
    dataSize: {
      type: Number,
      default: 10,
    },
    itemsOnPage: {
      type: Number,
      default: 10,
    },
    firstItem: Number,
    totalPages: Number,
  },

  methods: {
    activeBtn(index) {
      return this.currentPage === index - 1;
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
    handleChangePage(index) {
      this.currentPage = index - 1;
      this.$emit("handleChangePage", index);
    },

    shownTasks() {
      if (
        this.currentPage + 1 ===
        Math.ceil(this.dataSize / this.itemsOnPage)
      ) {
        return this.dataSize;
      } else {
        return this.currentPage + 1 * this.itemsOnPage;
      }
    },
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
