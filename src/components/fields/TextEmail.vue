<template>
  <q-input
    outlined
    type="email"
    :rules="rules"
    :value="props.value"
    @input="onChangeInput"
    no-error-icon
    :disable="disabled"
    :filled="filled"
    :stack-label="stacked"
    :bg-color="filled && 'blue-1'"
    hide-bottom-space=""
  />
</template>

<script>
export default {
  name: 'FieldTextEmail',
  computed: {
    rules() {
      const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return [
        (val) => !this.required || !!val || `${this.label} is required.`,
        (val) => emailFormat.test(val) || `${this.label} is invalid.`,
      ];
    },
  },
};
</script>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['input']);
const inputTextEmail = ref();

const props = defineProps({
  value: { type: String, default: null },
  label: { type: String, default: 'Email Address' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  filled: { type: Boolean, default: false },
  stacked: { type: Boolean, default: false },
});

function onChangeInput(val) {
  emit('input', val);
}

function validate() {
  return inputTextEmail.value.validate();
}

defineExpose({
  validate,
});
</script>
