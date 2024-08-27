<template>
  <q-input
    ref="inputTextPhoneNumber"
    :label="label"
    :rules="rules"
    :value="value"
    @input="onChangeInput"
    no-error-icon
  />
</template>

<script>
export default {
  name: 'FieldTextPhoneNumber',
  props: {
    value: { type: String, default: null },
    label: { type: String, default: 'Phone Number' },
    required: { type: Boolean, default: false },
  },
  computed: {
    rules() {
      // eslint-disable-next-line no-useless-escape
      // const numberFormat = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
      const numberFormat = /^08\d+$/;
      return [
        (val) => !this.required || !!val || `${this.label} is required.`,
        (val) => numberFormat.test(val) || `${this.label} is invalid.`,
      ];
    },
  },
  methods: {
    onChangeInput(val) {
      this.$emit('input', val);
    },
    validate() {
      return this.$refs.inputTextPhoneNumber.validate();
    },
  },
};
</script>
