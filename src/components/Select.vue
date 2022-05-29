<template>
  <div class="select__item">
    <div class="select__wrapper">
      <div class="select__title">
        <p>{{selectName}}</p>
        <svg
          class="select__arrow"
          width="8"
          height="6"
          viewBox="0 0 8 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.07861 6L0 0H1.82084L3.48812 3.52304C3.59537 3.74706 3.69287 3.98916 3.78062 4.24932C3.86837 4.50948 3.92931 4.72809 3.96344 4.90515H4.02194C4.05606 4.72087 4.12188 4.50045 4.21938 4.2439C4.31688 3.98374 4.41682 3.74345 4.5192 3.52304L6.18647 0H8L4.92139 6H3.07861Z"
            fill="#B5B5B5"
          />
        </svg>
      </div>

      <div class="checkbox__list">
        <div class="checkbox__wrapper">
          <div
            class="checkbox__item"
            v-for="(item, index) in data"
            :key="index"
          >
            <Checkbox
              :id="id + '-' + index"
              :labelText="id + '-' + index"
              :data="item"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectName: String,
    data: {
      type: Array,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    labelText: String,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.select {
  &__item {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: $labelFontColor;
    display: flex;
    width: 100%;
    height: 100%;
    margin-right: 14px;

    &.type {
      max-width: 98px;
    }

    &.users {
      max-width: 200px;
    }

    &.status {
      max-width: 130px;
    }

    &.rank {
      max-width: 120px;
    }
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    position: relative;
    flex-direction: column;
    width: 100%;

    &:hover .select__title {
      color: $fontColor;
      box-shadow: none;
      border: 1px solid #7b61ff;
      // height: 24px;
      border-radius: 3px;
    }

    &:hover,
    &:active {
      &.checkbox__list::after {
        display: block;
      }

      & .checkbox__list {
        display: block;
      }

      & .select__arrow {
        transform: rotate(180deg);
      }
    }

    & .select__wrapper.task-name:hover.select__wrapper::after {
      display: none;
    }
  }

  &__title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    height: 25px;
    padding: 2.5px 5px 2.5px 10px;
    box-shadow: inset 0 0 2px #b5b5b5;
    border-radius: 4px;
  }

  &__label {
    width: calc(100% + 10px);
    padding: 5px 0 2.5px 8px;

    &:last-child {
      padding-bottom: 5px;
    }
  }
}
.checkbox__list {
  display: none;
  position: absolute;
  max-height: 200px;
  top: 25px;
  left: -5px;
  z-index: 10;
  width: calc(100% + 10px);
  background: white;

  &::after {
    content: "";
    position: absolute;
    top: -31px;
    left: -1px;
    z-index: 10;
    width: calc(100% - 10px);
    height: calc(100% + 20px);
    border: 1px solid #7b61ff;
    border-radius: 3px;
    box-shadow: 0 0 2px rgba(123, 97, 255, 0.5);
    padding: 5px;
    pointer-events: none;
  }
}

.checkbox {
  &__wrapper {
    max-height: 200px;

    overflow-y: scroll;
    overflow-x: hidden;
    -ms-overflow-style: none; // IE 10+
    scrollbar-width: none; // Firefox
  }

  &__wrapper::-webkit-scrollbar {
    // Chrome
    width: 0px;
    background: transparent;
  }

  &__list:last-child {
    border-radius: 3px;
  }

  &__item {
    color: $fontColor;
    width: 100%;

    &:hover {
      background-color: #e6e1ff;
    }
  }
}
</style>