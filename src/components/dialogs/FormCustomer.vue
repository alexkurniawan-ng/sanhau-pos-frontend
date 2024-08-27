<template>
  <q-dialog :value="props.value">
    <q-card class="card-container" style="width: 1200px; max-width: 70vw;">
      <q-card-section>
        <div class="row justify-between">
          <div class="col text-title">Customer Baru</div>
          <q-btn class="col-auto" icon="close" flat @click="closeDialog" />
        </div>

        <div class="row justify-between q-mt-md">
          <div class="col-4 q-pr-md q-py-sm row justify-end text-form">Nama Customer</div>
          <div class="col-8">
            <FieldText style="width: 95%"/>
          </div>
        </div>

        <div class="row justify-between q-mt-md">
          <div class="col-4 q-pr-md q-py-sm row justify-end text-form">NPWP / KTP</div>
          <div class="col-8">
            <FieldText style="width: 95%"/>
          </div>
        </div>

        <div class="row justify-between q-mt-md">
          <div class="col-4 q-pr-md q-py-sm row justify-end text-right text-form">Alamat Penagihan (Sesuai NPWP / KTP)</div>
          <div class="col-8">
            <FieldText type="textarea" rows="3" style="width: 95%"/>
          </div>
        </div>

        <div class="row justify-between q-mt-md">
          <div class="col-4 q-pr-md q-py-sm row justify-end text-form">Nama Kontak</div>
          <div class="col-8">
            <FieldText style="width: 95%"/>
          </div>
        </div>

        <div class="row justify-between q-mt-md">
          <div class="col-4 q-pr-md q-py-sm row justify-end text-form">Nomor Telepon Kontak</div>
          <div class="col-8">
            <FieldText style="width: 95%"/>
          </div>
        </div>

        <div class="row justify-between q-mt-md">
          <div class="col-4 q-pr-md q-py-sm row justify-end text-form">Email</div>
          <div class="col-8">
            <FieldEmail dense style="width: 95%"/>
            <!-- <FieldText type="email" style="width: 95%"/> -->

          </div>
        </div>

        <div class="row justify-between q-mt-md">
          <div class="col-4 q-pr-md q-py-sm row justify-end text-form">Nama Kontak Pengiriman</div>
          <div class="col-8">
            <FieldText style="width: 95%"/>
          </div>
        </div>

        <div class="row justify-between q-mt-md">
          <div class="col-4 q-pr-md q-py-sm row justify-end text-form">Telepon Kontak Pengiriman</div>
          <div class="col-8">
            <FieldText style="width: 95%"/>
          </div>
        </div>

        <div class="row justify-between q-mt-md">
          <div class="col-4 q-pr-md q-py-sm row justify-end text-form">Alamat Pengiriman</div>
          <div class="col-8">
            <FieldText type="textarea" rows="3" style="width: 95%"/>
            <q-btn class="q-my-md" label="Simpan" no-caps color="blue" unelevated />
          </div>
        </div>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import FieldText from 'src/components/fields/Text.vue';
import FieldEmail from 'src/components/fields/TextEmail.vue';

export default {
  name: 'DialogFormCustomer',
  components: { FieldText, FieldEmail },
};
</script>
<script setup>
const props = defineProps({
  value: { type: Boolean, default: null },
});
const emit = defineEmits(['close-dialog']);

function closeDialog() {
  emit('close-dialog', false);
}
</script>
<style scoped>
.card-container {
  background-color: white;
}
.text-title {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.005em;
  color: #2b2626;
}
.text-form {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: 0.005em;
  color: #2b2626;
}
</style>
