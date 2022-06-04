<template>
  <textarea
    class="textarea"
    :value="value"
    v-bind="$attrs"
    v-on="listeners"
    spellCheck
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: String,
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
.textarea {
  @include input-default;
  resize: none;
  width: 100%;

  &::placeholder {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: $labelFontColor;
  }
}

.input {
  &__comment {
    max-width: 458px;
    height: 76px;
    margin-top: 8px;
    margin-bottom: 10px;
  }

  &__title {
    margin-bottom: 20px;
  }
  &__card {
    &-description {
      height: 607px;
      margin-bottom: 0;
    }
  }
}
</style>