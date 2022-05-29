<template>
  <div>
    <input
      class="input"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      :required="required"
    />
    <label :for="name" class="card__label label"> {{ labelText }} </label>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: String,
    required: Boolean,
    labelText: [String, Number],
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
}
</style>