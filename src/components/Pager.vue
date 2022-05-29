<template>
  <div class="pagination__inner">
    <Button
      class="btn-pagination"
      title="Назад"
      :disabled="currentPage === 0"
      @click="prevPage"
    />
    <Button
      v-for="index in pages"
      :key="index"
      class="btn-pagination"
      :class="{ active: activeBtn(index) }"
      :title="index"
      :value="index"
      @click="handleChangePage(index)"
    />
    <Button
      class="btn-pagination"
      title="Вперед"
      :disabled="currentPage === pages - 1"
      @click="nextPage"
    />
  </div>
</template>

<script>
export default {
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
  data() {
    return {
      currentPage: 0,
    };
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
}
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