<template>
  <div>
    <textarea
      class="textarea"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :maxLength="maxLength"
      :required="required"
      spellCheck
    />
    <label :for="name" class="card__label label">
      {{ labelText }}
    </label>
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
    maxLength: Number,
    required: Boolean,
    labelText: [String, Number],
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
</style>