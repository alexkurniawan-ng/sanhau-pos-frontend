<template>
    <q-input 
      outlined
      v-model="pickedDate"
      mask="date"
      no-error-icon
      dense
      readonly
    >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="pickedDate" minimal>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="OK" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'FieldTextDate',
};
</script>

<script setup>
import { ref, watch } from 'vue';
import moment from 'moment';

const emit = defineEmits(['update-date']);

const props = defineProps({
  date: { type: Date },
});

const pickedDate = ref(moment(new Date(props.date)).format('YYYY/MM/D'));

watch(pickedDate, (newValue) => {
  emit('update-date', new Date(newValue));
});
</script>
