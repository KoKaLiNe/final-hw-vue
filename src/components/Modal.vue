<template>
  <transition name="modal-fade">
    <div class="modal">
      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header"> </slot>
        </div>
        <div class="modal__body">
          <slot name="body"> </slot>
        </div>
        <div class="modal__footer">
          <slot name="footer"> </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(181, 181, 181, 0.35);
  @include border-radius(5px);
  text-align: start;

  /deep/ &__dialog {
    @include flexible;
    flex-direction: column;
    width: 100%;
    height: 100%;
    max-width: 430px;
    max-height: 405px;
    background: #ffffff;
    @include border-radius(5px);
  }

  &__body {
    padding: 20px 30px;
    height: 100%;
  }

  /deep/ &__header {
    padding-bottom: 20px;
    border-bottom: 1px solid $innerShadowColor;
    padding: 15px 30px;
  }

  /deep/ &__field {
    justify-content: flex-start;
  }

  /deep/ &__label {
    line-height: 1em;
  }

  /deep/ &__textarea {
    height: 76px;
  }

  /deep/ &__title {
    @include font($size: 20px, $weight: 400);
    line-height: 1.5em;
  }

  /deep/ &__footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    align-content: center;
    border-top: 1px solid $innerShadowColor;
    height: 100%;

    &-btns {
      margin: 16px 25px;
    }
  }
}
</style>