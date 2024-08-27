<template>
  <q-input
    outlined
    v-model="newValue"
    @input="onChangeInput"
    no-error-icon
    dense
    :placeholder="props.placeholder"
    type="number"
    :rows="props.rows"
  />
</template>

<script>
export default {
  name: 'FieldTextNumber',
};
</script>

<script setup>
import { ref, watchEffect } from 'vue';

const emit = defineEmits(['update-value', 'value']);
const inputText = ref();

const props = defineProps({
  value: { type: Number, default: null },
  placeholder: { type: String, default: null },
  rows: { type: String, default: null },
});

const newValue = ref(props.value);

function onChangeInput(val) {
  emit('input', val);
}

function validateText() {
  return inputText.value.validate();
}

watchEffect(() => {
  emit('update-value', parseInt(newValue.value, 10));
});

defineExpose({
  validateText,
});
</script>
