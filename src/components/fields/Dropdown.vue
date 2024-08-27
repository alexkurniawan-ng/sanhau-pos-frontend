<template>
  <q-select
    outlined
    v-model="newValue"
    no-error-icon
    dense
    :options="props.options"
    style="width: 200px"
    :placeholder="props.placeholder"
    :disable="props.disable"
    :filled="filled"
  />
</template>

<script>
export default {
  name: 'FieldDropdown',
};
</script>

<script setup>
import { ref, watchEffect } from 'vue';

const emit = defineEmits(['update-value']);
const inputText = ref();

const props = defineProps({
  value: { type: String, default: null },
  placeholder: { type: String, default: null },
  options: { type: Array, default: null },
  disable: { type: Boolean, default: false },
  filled: { type: Boolean, default: false },
});

const newValue = ref(props.value);

function validateText() {
  return inputText.value.validate();
}

watchEffect(() => {
  emit('update-value', newValue.value);
});

defineExpose({
  validateText,
});
</script>
