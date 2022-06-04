<template>
  <div>
    <input
      class="checkbox"
      type="checkbox"
      :checked="isChecked"
      :value="value"
      :id="id"
      :name="name"
      @change="updateInput"
    />
    <label class="checkbox__label" :for="id">
      <slot></slot>
    </label>
  </div>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change",
  },
  props: {
    value: { type: String },
    modelValue: { default: "" },
    trueValue: { default: true },
    falseValue: { default: false },
    id: {
      type: String,
      default: "checkbox",
    },
    name: {
      type: String,
      default: "checkbox",
    },
  },
  data() {
    return {};
  },
  computed: {
    isChecked() {
      if (this.modelValue instanceof Array) {
        return this.modelValue.includes(this.value);
      }
      return this.modelValue === this.trueValue;
    },
  },
  methods: {
    updateInput(event) {
      
      let isChecked = event.target.checked;
      if (this.modelValue instanceof Array) {
        let newValue = [...this.modelValue];
        if (isChecked) {
          newValue.push(this.value);
        } else {
          newValue.splice(newValue.indexOf(this.value), 1);
        }
        this.$emit("change", newValue);
      } else {
        this.$emit("change", isChecked ? this.trueValue : this.falseValue);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;

  &__label {
    
    font-size: 16px;
    color: $fontColor;
    width: calc(100% + 10px);
    padding: 5px 0 2.5px 8px;

    &:last-child {
      padding-bottom: 5px;
    }
  }
}

.checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}

.checkbox + label::before {
  content: "";
  display: inline-block;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #333333;
  background-color: $boardBGColor;
  border-radius: 5px;
  margin-right: 5px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.checkbox:checked + label::before {
  border-color: #7b61ff;
  background-color: #7b61ff;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='13' viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.31511 6.01668L0.200185 0H3.18072L5.99444 4.32623L8.81928 0H11.7887L7.65153 6.01668L12 12.3114H9.00834L5.99444 7.69601L2.96942 12.3114H0L4.31511 6.01668Z' fill='%23F4F4F4'/%3E%3C/svg%3E");
}

/* стили при наведении курсора на checkbox */
.checkbox:not(:disabled):not(:checked) + label:hover::before {
  border-color: #7b61ff;
}
</style>