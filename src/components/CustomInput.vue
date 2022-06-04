<template>
  <div>
    <input
      class="input"
      :value="value"
      v-bind="$attrs"
      v-on="listeners"
      :class="className"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: String,
    className: String,
  },
  watch: {
    inputText(val) {
      this.$emit("input", val);
    },
  },
  mounted() {
    this.inputText = this.value;
  },
  computed: {
    listeners() {
      var vm = this;
      // `Object.assign` объединяет объекты вместе, чтобы получить новый объект
      return Object.assign(
        {},
        // Мы добавляем все слушатели из родителя
        this.$listeners,
        // Затем мы можем добавить собственные слушатели или
        // перезаписать поведение некоторых существующих.
        {
          // Это обеспечит, что будет работать v-model на компоненте
          input: function (event) {
            vm.$emit("input", event.target.value);
          },
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  @include input-default;
  resize: none;
  width: 100%;

  &::placeholder {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: $labelFontColor;
  }

  &__comment {
    max-width: 458px;
    height: 76px;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  &__modal {
    height: 24px;
    padding: 2.5px 10px;
    margin-bottom: 20px;

    &-comment {
      height: 76px;
      margin-bottom: 0;
    }
  }

  &-filter {
    height: 27px;
    padding: 2.5px 10px;
    // margin: -1px;
    // max-width: 527px;
  }
}
</style>