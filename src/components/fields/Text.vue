<template>
  <q-input
    outlined
    v-model="text"
    no-error-icon
    dense
    clearable
    clear-icon="close"
    :placeholder="props.placeholder"
    :rows="props.rows"
    :debounce="props.debounce"
  />
</template>

<script>
export default {
  name: 'FieldText',
};
</script>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update-text']);
const inputText = ref();

const props = defineProps({
  value: { type: String, default: null },
  placeholder: { type: String, default: null },
  rows: { type: String, default: null },
  debounce: { type: String, default: null },
});

const text = ref(props.value);

watch(text, (newValue) => {
  emit('update-text', newValue);
});

function validateText() {
  return inputText.value.validate();
}

defineExpose({
  validateText,
});
</script>
