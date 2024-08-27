<template>
  <q-input
    ref="inputTextPassword"
    :type="type"
    outlined
    :label="label"
    :rules="rules"
    :value="props.value"
    @input="onChangeInput"
    :filled="filled"
    :disable="disable"
    :stack-label="stacked"
    :bg-color="filled && 'blue-1'"
    no-error-icon
  >
    <template v-slot:append>
      <q-icon :name="icon" @click="changeVisibility" class="cursor-pointer" color="grey" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'FieldTextPassword',
  computed: {
    rules() {
      return [(val) => !this.required || !!val || `${this.label} is required.`];
    },
  },
};
</script>
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['input']);

const type = ref('password');
const icon = ref('visibility_off');

function changeVisibility() {
  if (type.value === 'password') {
    type.value = 'text';
    icon.value = 'visibility';
  } else {
    type.value = 'password';
    icon.value = 'visibility_off';
  }
}

const props = defineProps({
  value: { type: String, default: null },
  label: { type: String, default: 'Password' },
  required: { type: Boolean, default: false },
  disable: { type: Boolean, default: false },
  filled: { type: Boolean, default: false },
  stacked: { type: Boolean, default: false },
});

function onChangeInput() {
  emit('input', false);
}

// function validate() {
//   return this.$refs.inputTextPassword.validate();
// }
</script>
