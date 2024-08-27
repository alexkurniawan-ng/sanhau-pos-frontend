<template>
  <q-card class="card-container">
    <q-card-section>
      <!-- INV DATE -->
      <div class="row">
        <div class="col-auto column">
          <div class="text-column">Tanggal Invoice</div>
          <FieldTextDate />
        </div>
      </div>

      <!-- CUSTOMER -->
      <div class="row q-mt-md">
        <div class="col column">
          <div class="text-column">Nama Customer</div>
          <div class="row">
            <q-select class="col" style="min-width: 150px"
              use-input outlined dense flat :placeholder="customer.name ? '' : 'Ketik nama customer...'" 
              v-model="props.customer.name" :options="customerList" @input-value="searchCustomer" 
              @update:model-value="updateCustomer" map-options="label" :emit-value="false" clearable
            >
            </q-select>
            <q-btn unelevated dense icon="add" color="blue" class="col-auto q-ml-sm" style="width: 40px" @click="openFormCustomer" />
          </div>
          <div class="text-column" style="margin-top: 14px">No. Telp Penagihan</div>
          <FieldText placeholder="Ketikkan nomor telepon..." v-model="props.customer.number" style="min-width: 200px" />
        </div>
        <div class="col column q-ml-md">
          <div class="text-column">Alamat Penagihan</div>
          <FieldText class="col" v-model="props.customer.address" style="min-width: 200px" type="textarea" rows="5" />
        </div>
        <div class="col column q-ml-md">
          <div class="text-column">No. Referensi / PO</div>
          <FieldText class="col" v-model="props.customer.reference" placeholder="Ketik no referensi..." style="min-width: 200px" />
          <q-checkbox 
            class="col text-column" 
            style="margin-left: -5px; margin-top: -100px" 
            v-model="addDetail" label="Detail Pengiriman" size="xs" 
          />
        </div>
      </div>

      <!-- DELIVERY DETAIL -->
      <div class="row q-mt-lg" v-if="addDetail">
        <div class="col column">
          <div class="text-column">Nama Kontak Pengiriman</div>
          <FieldText class="col" v-model="props.customer.deliveryContact" placeholder="Ketik nama kontak..." style="min-width: 200px" />
          <div class="text-column" style="margin-top: 14px">No. Telp Pengiriman</div>
          <FieldText v-model="props.customer.deliveryNumber" placeholder="Ketikkan nomor telepon..." style="min-width: 200px" />
        </div>
        <div class="col column q-ml-md">
          <div class="text-column">Alamat Pengiriman</div>
          <FieldText class="col" v-model="props.customer.deliveryAddress" style="min-width: 200px" type="textarea" rows="5" />
        </div>
        <div class="col column q-ml-md">
          <div class="text-column">Tanggal Kirim</div>
          <FieldTextDate style="max-width: 200px" :date="props.customer.deliveryDate" />
        </div>
      </div>

    </q-card-section>
  </q-card>
  <DialogFormCustomer v-model="dialogCustomer" @close-dialog="closeDialog" />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import FieldTextDate from 'src/components/fields/TextDate.vue';
import FieldText from 'src/components/fields/Text.vue';
import DialogFormCustomer from 'src/components/dialogs/FormCustomer.vue';
import { useCustomerStore } from 'src/stores/customer';

export default defineComponent({
  name: 'TemplateInvoiceFormHeader',
  components: { FieldTextDate, FieldText, DialogFormCustomer },
});
</script>

<script setup>
const customerStore = useCustomerStore();

const props = defineProps({
  customer: { type: Object },
});

const customerList = reactive([' ']);

const addDetail = ref(false);
const dialogCustomer = ref(false);

function updateCustomer(value) {
  props.customer.name = value.label;
  props.customer.number = value.data.customerContactNumber;
  props.customer.address = value.data.customerIdentityAddress;
  props.customer.deliveryContact = value.data.customerDeliveryContactPerson;
  props.customer.deliveryNumber = value.data.customerDeliveryContactNumber;
  props.customer.deliveryAddress = value.data.customerDeliveryAddress;
}

function searchCustomer(value) {
  if (value.length === 0) {
    customerList.splice(0, customerList.length);
    return;
  }
  customerStore.getSearchCustomerList({ name: value })
    .then(onSuccessSearchCustomer)
    .catch((err) => console.error(err));
} 

function onSuccessSearchCustomer(data) {
  const newOptions = data.map((item) => ({
    label: item.customerName,
    value: item.id,
    data: item,
  }));
  customerList.splice(0, customerList.length, ...newOptions); 
}

function openFormCustomer() {
  dialogCustomer.value = true;
}

function closeDialog(value) {
  dialogCustomer.value = value;
}

</script>
<style scoped>
.card-container {
  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.12);
}
.text-column {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.005em;
  color: #2b2626;
}

</style>
