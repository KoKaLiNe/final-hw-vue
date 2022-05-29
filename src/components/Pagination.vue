<template>
  <div class="root">
    <div class="pagination">
      <Pager
        :dataArray="dataArray"
        :size="size"
        :startStep="startStep"
        :endStep="endStep"
        :pages="pages"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @handleChangePage="handleChangePage"
      />
      <span class="pagination__count"
        >Показано {{ currentPage * size + 1 }} - {{ showntasks() }} из
        {{ dataArray.length }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 0,
    };
  },
  props: {
    dataArray: {
      type: Array,
      default() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
      },
    },
    size: {
      type: Number,
      default: 10,
    },
    startStep: Number,
    endStep: Number,
    pages: Number,
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

    showntasks() {
      if (
        this.currentPage + 1 ===
        Math.ceil(this.dataArray.length / this.size)
      ) {
        return this.dataArray.length;
      } else {
        return this.currentPage + 1 * this.size;
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
