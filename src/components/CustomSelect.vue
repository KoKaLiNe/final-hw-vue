<template>
  <div class="select__item" @change="onChange(selectedValues)">
    <div class="select__wrapper">
      <div class="select__title">
        <p>{{ selectName }}</p>
        <svg class="select__arrow" width="8" height="6">
          <use :xlink:href="`#select-arrow`" />
        </svg>
      </div>

      <div class="checkbox__list">
        <div class="checkbox__wrapper">
          <CustomCheckbox
            class="checkbox__item"
            v-for="(item, index) in data"
            :key="index"
            :id="id + '-' + index"
            v-model="selectedValues"
            :value="item[itemValue]"
          >
            {{ item[itemName] }}
          </CustomCheckbox>
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
      type: [Object, Array],
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    itemValue: String,
    itemName: String,
    selectedFilter: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      selectedValues: [],
    };
  },
  methods: {
    onChange() {
      this.$emit("change", this.selectedValues);
    },
  },
  mounted() {
    this.selectedValues = this.selectedFilter;
  },
};
</script>

<style lang="scss" scoped>
.select {
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