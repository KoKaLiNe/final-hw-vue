<template>
  <div class="dropdown-content" v-if="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // isActive: false,
    };
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.$emit("toggle");
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  &-content {
    position: absolute;
    top: 20px;
    right: 0;
    z-index: 10;

    background-color: #ffffff;
    width: 112px;
    height: auto;
    @include border-radius(5px);
    box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
    overflow: hidden;
  }

  &-link {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-decoration: none;
    color: $fontColor;
    background-color: #ffffff;
    display: block;
    padding: 3px 0 3px 4px;
    border: none;
    text-align: left;
    cursor: pointer;

    & a {
      text-decoration: none;
      color: inherit;
    }

    &.accent {
      color: $errorColor;
    }

    &:hover {
      background-color: #e6e1ff;
    }

    &:active {
      background-color: $primaryColor;
      color: #f4f4f4;
    }
  }

  &:hover &-content {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    text-align: start;
  }

  &:hover &-btn {
    color: #f4f4f4;
    background-color: $primaryColor;
    cursor: pointer;
  }
}
</style>