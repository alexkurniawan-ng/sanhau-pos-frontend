<template>
  <q-card class="card-container">
    <q-card-section>
      <div class="row">

        <!-- DESCRIPTION -->
        <div class="col column">
          <div v-for="index in row" :key="index">
            <OrganismInvoiceProductUnit
              v-model:product="products[index - 1]"
              @update-qty="(value) => updateQty(value, index - 1)"
              @update-unit="(value) => updateUnit(value, index - 1)"
              @update-price="(value) => updatePrice(value, index - 1)"
            />
          </div>
        </div>
      </div>

      <!-- TOTAL -->
      <div class="column" :key="form.subtotal">
        <div class="col row justify-end q-mt-md">
          <div class="col-3 column">
            <div class="text-column">Subtotal</div>
            <FieldTextNumber class="border-form" :value="form.subtotal" :disable="true" filled style="min-width: 200px" />
          </div>
        </div>

        <div class="col row justify-end q-mt-md" :key="form.ppn">
          <div class="col-3 column">
            <div class="text-column">include PPn 11%</div>
            <FieldTextNumber class="border-form" :value="form.ppn" :disable="true" filled style="min-width: 200px" />
          </div>
        </div>

        <div class="col row justify-end q-mt-md">
          <div class="col-3 column">
            <div class="text-column">Discount</div>
            <FieldTextNumber style="min-width: 200px" :value="form.discount" />
          </div>
        </div>

        <div class="col row justify-end q-mt-md" :key="form.totalInvoice">
          <div class="col-3 column">
            <div class="text-column">Total</div>
            <FieldTextNumber class="border-form" :value="form.totalInvoice" :disable="true" filled style="min-width: 200px" />
          </div>
        </div>

        <div class="col row justify-end q-mt-md">
          <div class="col-3 column">
            <div class="text-column">Down Payment</div>
            <FieldTextNumber :value="form.downPayment" style="min-width: 200px" />
          </div>
        </div>

        <div class="col row justify-end q-mt-md" :key="form.totalPaid">
          <div class="col-3 column">
            <div class="text-column">Sisa Tagihan</div>
            <FieldTextNumber class="border-form" :value="form.totalPaid" :disable="true" filled style="min-width: 200px" />
          </div>
        </div>

        <div class="col row justify-end q-mt-md">
          <div class="col-3 column">
            <q-btn label="Submit" no-caps color="blue" unelevated @click="onSubmit" />
          </div>
        </div>
      </div>

    </q-card-section>
  </q-card>
</template>
<script>
import {
  defineComponent, reactive, ref,
} from 'vue';
import FieldTextNumber from 'src/components/fields/TextNumber.vue';
import OrganismInvoiceProductUnit from 'src/components/organisms/Invoice/ProductUnit.vue';

export default defineComponent({
  name: 'TemplateInvoiceFormBody',
  components: { FieldTextNumber, OrganismInvoiceProductUnit },
  setup() {
    const form = reactive({
      startDate: null,
      endDate: null,
      invoiceNumber: null,
      customer: null,
      discount: 0,
      subtotal: 0,
      ppn: 0,
      totalInvoice: 0,
      downPayment: 0,
      totalPaid: 0,
    });

    const products = reactive([
      {
        name: '',
        qty: 0,
        unit: '',
        unitPrice: 0,
        totalPrice: 0,
      },
      {
        name: '',
        qty: 0,
        unit: '',
        unitPrice: 0,
        totalPrice: 0,
      },
      {
        name: '',
        qty: 0,
        unit: '',
        unitPrice: 0,
        totalPrice: 0,
      },
      {
        name: '',
        qty: 0,
        unit: '',
        unitPrice: 0,
        totalPrice: 0,
      },
      {
        name: '',
        qty: 0,
        unit: '',
        unitPrice: 0,
        totalPrice: 0,
      },
    ]);

    const row = ref(5);

    function updateQty(value, index) {
      products[index].qty = value;
      calculatePrice(index);
    }

    function updatePrice(value, index) {
      products[index].unitPrice = value;
      calculatePrice(index);
    }

    function updateUnit(value, index) {
      products[index].unit = value;
    }

    function calculatePrice(index) {
      products[index].totalPrice = products[index].qty * products[index].unitPrice;
      form.subtotal = products.reduce((acc, obj) => { return acc + obj.totalPrice; }, 0);
      form.ppn = form.subtotal * 0.11;
      form.totalInvoice = form.subtotal + form.ppn - form.discount;
      form.totalPaid = form.totalInvoice - form.downPayment;
    }

    function onSubmit() {
      console.log({ products });
      console.log({ form });
    }

    return {
      row,
      form,
      products,
      updateUnit,
      updateQty,
      updatePrice,
      calculatePrice,
      onSubmit,
    };
  },
});
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
.border-form {
  min-width: 200px;
  border: 1px solid black;
}
</style>
