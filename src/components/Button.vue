<template>
  <button
    class="btn"
    :class="className"   
    @click="click"
    :disabled="disabled"
  >
    {{title}}
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number],
      default: "Button"
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
    }
  },

  methods: {
    click() {
      this.$emit("click")
    }
  },

  computed: {
    className() {
      return {
        'btn-primary': this.primaryBtn,
        'btn-success': this.successBtn,
        'btn-error': this.errorBtn,
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.btn {
  @include btn-default;
  &-primary {
    @include btn-primary;
  }
  &-success {
    @include btn-success;
  }
  &-error {
    @include btn-error;
  }
}
</style>