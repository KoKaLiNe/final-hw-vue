<template>
  <button class="btn" :class="className" v-on="$listeners" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number],
      default: "Button",
    },
    primaryBtn: {
      type: Boolean,
      default: false,
    },
    successBtn: {
      type: Boolean,
      default: false,
    },
    errorBtn: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      return {
        "btn-primary": this.primaryBtn,
        "btn-success": this.successBtn,
        "btn-error": this.errorBtn,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  @include btn-default;
  height: 24px;
  &-primary {
    @include btn-primary;
  }
  &-success {
    @include btn-success;
  }
  &-error {
    @include btn-error;
  }
  &-link {
    @include btn-link;
    color: inherit;
  }
  &-board__header {
    margin-left: 10px;
    padding-top: 1px;
  }
  &__comment {
    color: $errorColor;
  }
  &-submit {
    width: 100%;
    margin-top: 10px;
  }
}
</style>