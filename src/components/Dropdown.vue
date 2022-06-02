<template>
  <div class="dropdown">
    <div
      class="dropdown-btn"
      :class="[classBtn, { active: isActive }]"
      @click="toggle"
      v-click-outside="hide"
    >
      <slot name="dropdown-btn"></slot>
    </div>
    <div class="dropdown-content" :class="classContent" v-show="isActive">
      <slot name="dropdown-content"></slot>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false,
    },
    classContent: String,
    classBtn: String,
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      this.$emit("toggle");
    },
    hide() {
      this.isActive = false;
      this.$emit("hide");
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: end;
  cursor: pointer;
  position: relative;

  &-btn {
    width: auto;
    height: auto;
    cursor: pointer;

    &__user {
      display: flex;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;
    }
  }

  &-content {
    position: absolute;
    z-index: 10;

    background-color: $boardBGColor;
    width: 112px;
    height: auto;
    @include border-radius(5px);
    box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
    overflow: hidden;

    &.task-menu {
      top: 20px;
      right: 0;
    }

    &.user-dropdown {
      top: 20px;
      right: 0;
    }
  }

  &-link {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-decoration: none;
    color: $fontColor;
    background-color: $boardBGColor;
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
}

.task-menu-btn {
  background-color: transparent;
  width: auto;
  height: auto;
  line-height: 0;
  padding: 4px 5px;
  margin-left: 95px;
  color: $primaryColor;
  @include border-radius(5px);
  border: none;

  &.active {
    color: $boardBGColor;
    background-color: $primaryColor;
  }
  &:hover {
    color: #f4f4f4;
    background-color: $primaryColor;
    cursor: pointer;
  }
}
.user-menu {
  top: 45px;
  right: 20px;
  width: 136px;
}
</style>