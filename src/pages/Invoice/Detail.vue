<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg">
      <!-- Header: Payment Type and Amount Due -->
      <div class="row justify-between items-center q-mb-xl">
        <div class="col-6">
          <q-badge class="text-h5">{{ form.customer }}</q-badge>
          <div class="q-mt-sm text-bold text-h6">{{ form.invoiceNumber }}</div>
          <div>{{ form.invoiceDate }}</div>
        </div>
        <div class="col-6 text-right">
          <div class="text-h5">Sisa Tagihan</div>
          <div class="text-h4 text-primary">Rp. {{ form.invoiceTotal.toLocaleString('id', { minimumFractionDigits: 2 }) }}</div>
          <div class="text-negative text-unpaid">{{ form.paymentStatus }}</div>
        </div>
      </div>

      <!-- Product List -->
      <div class="q-mt-xl" style="font-size: 16px">
        <div class="row q-mb-md">
          <div class="col q-px-sm">
            <div class="text-title">Nama Barang</div>
          </div>
          <div class="col-2 q-px-sm">
            <div class="text-title">Quantity</div>
          </div>
          <div class="col-2 q-px-md">
            <div class="text-title">Harga</div>
          </div>
          <div class="col-3 q-px-sm">
            <div class="text-title">Jumlah</div>
          </div>
        </div>

        <div v-if="form.products?.length > 0">
          <div v-for="product, index in form.products" :key="index" class="row q-mb-md">
            <div class="col q-px-sm">
              <div>{{ product.productName }}</div>
            </div>
            <div class="col-2 q-px-sm">
              <div>{{ product.quantity }} {{ product.unit }}</div>
            </div>
            <div class="col-2 q-px-md">
              <div class="row justify-between">
                <div>Rp.</div>
                <div>{{ product.price.toLocaleString('id', { minimumFractionDigits: 2 }) }}</div>
              </div>
            </div>
            <div class="col-3 q-px-sm">
              <div class="row justify-between">
                <div>Rp.</div>
                <div>{{ (product.price * product.quantity).toLocaleString('id', { minimumFractionDigits: 2 }) }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="row q-mb-md">
          <div class="col-9 q-px-md">
            <div class="text-right text-semibold">Discount</div>
          </div>
          <div class="col-3 q-px-sm">
            <div class="row justify-between">
              <div>Rp.</div>
              <div>{{ (form.discount).toLocaleString('id', { minimumFractionDigits: 2 }) }}</div>
            </div>
          </div>
        </div>
        <div class="row q-mb-md" style="font-size: 20px;">
          <div class="col-9 q-px-md">
            <div class="text-right text-bold">Total</div>
          </div>
          <div class="col-3 q-px-sm">
            <div class="row justify-between text-bold">
              <div>Rp.</div>
              <div>{{ (form.invoiceTotal).toLocaleString('id', { minimumFractionDigits: 2 }) }}</div>
            </div>
          </div>
        </div>
        <div class="row q-mb-md">
          <div class="col-9 q-px-md">
            <div class="text-right text-semibold">Down Payment</div>
          </div>
          <div class="col-3 q-px-sm">
            <div class="row justify-between">
              <div>Rp.</div>
              <div>{{ (form.downPayment).toLocaleString('id', { minimumFractionDigits: 2 }) }}</div>
            </div>
          </div>
        </div>
        <div class="row q-mb-md">
          <div class="col-9 q-px-md">
            <div class="text-right text-semibold">Sudah Dibayar</div>
          </div>
          <div class="col-3 q-px-sm">
            <div class="row justify-between">
              <div>Rp.</div>
              <div>{{ (form.partialPayment).toLocaleString('id', { minimumFractionDigits: 2 }) }}</div>
            </div>
          </div>
        </div>
        <div class="row q-mb-md">
          <div class="col-9 q-px-md">
            <div class="text-right text-semibold">DPP</div>
          </div>
          <div class="col-3 q-px-sm">
            <div class="row justify-between">
              <div>Rp.</div>
              <div>{{ (form.invoiceTotal / 1.11).toLocaleString('id', { minimumFractionDigits: 2 }) }}</div>
            </div>
          </div>
        </div>
        <div class="row q-mb-md">
          <div class="col-9 q-px-md">
            <div class="text-right text-semibold">Include PPn 11%</div>
          </div>
          <div class="col-3 q-px-sm">
            <div class="row justify-between">
              <div>Rp.</div>
              <div>{{ (form.invoiceTotal - form.invoiceTotal / 1.11).toLocaleString('id', { minimumFractionDigits: 2 }) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="row justify-between q-mt-xl">
        <div class="row">
          <q-btn no-caps label="Kembali" color="grey" @click="goToList" unelevated style="border-radius: 6px;" />
          <q-btn class="q-ml-md" no-caps label="Buat Memo Pengambilan" color="primary" unelevated style="border-radius: 6px;" />
        </div>
        <q-btn label="Print" color="primary" outline unelevated style="border-radius: 6px;" />
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import { useInvoiceStore } from 'src/stores/invoice';
import moment from 'moment';

export default defineComponent({
  name: 'PageInvoiceDetail',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const invoiceStore = useInvoiceStore();

    const form = reactive({
      customer: '',
      paymentStatus: '',
      invoiceTotal: 0,
      downPayment: 0,
      discount: 0,
      invoiceNumber: '',
      invoiceDate: '',
      products: null,
      linkedJurnalId: null,
      note: null,
      memo: null,
      partialPayment: 0,
    });

    function onSuccessGetDetail(data) {
      form.customer = data.customer;
      form.paymentStatus = data.paymentStatus;
      form.invoiceTotal = data.invoiceTotal;
      form.downPayment = data.downPayment;
      form.discount = data.discount;
      form.invoiceNumber = data.invoiceNumber;
      form.invoiceDate = moment(new Date(data.invoiceDate)).format('D - MM - YYYY');
      form.products = data.products;
    }

    function goToList() {
      router.replace({ name: 'PageMainInvoice' });
    }

    onMounted(() => {
      $q.iconSet.arrow.dropdown = 'expand_more';

      const { slug } = route.params;
      if (slug) {
        invoiceStore
          .getInvoiceDetail({ slug })
          .then(onSuccessGetDetail)
          .catch((err) => console.error(err));
      }
    });

    return {
      form,
      goToList,
    };
  },
});
</script>
<style scoped>
.card-container {
  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.12);
}
.text-unpaid {
  font-family: 'Poppins';
  font-size: 16px;
}
.text-title {
  font-size: 18px;
  font-weight: 500;
}
</style>
