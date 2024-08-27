<template>
  <q-input
    ref="inputTextEmail"
    type="email"
    :label="label"
    :rules="rules"
    :value="value"
    @input="onChangeInput"
    no-error-icon
  >
    <template v-slot:append>
      <q-btn 
        v-if="isChanged" 
        class="text-verification" 
        label="Verification" 
        flat 
        no-caps 
        :loading="loading"
        @click="$emit('send-mail')"
      /> 
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'FieldTextEmailVerification',
  props: {
    value: { type: String, default: null },
    label: { type: String, default: 'Email Address' },
    required: { type: Boolean, default: false },
    isChanged: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
  },
  computed: {
    rules() {
      const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return [
        (val) => !this.required || !!val || `${this.label} is required.`,
        (val) => emailFormat.test(val) || `${this.label} is invalid.`,
      ];
    },
  },
  methods: {
    onChangeInput(val) {
      this.$emit('input', val);
    },
    validate() {
      return this.$refs.inputTextEmail.validate();
    },
  },
};
</script>
<style scoped>
.text-verification {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.006em;
  color: #4DA6FF;
  margin-right: -15px !important;
  margin-top: 11px !important;
}
</style>
