<template>
  <q-card class="card-container">
    <q-card-section>
      <!-- FILTER -->
      <div class="row">
        <div class="col-auto column">
          <div class="text-column">Start date</div>
          <FieldTextDate :date="filterData.startDate" @update-date="updateStartDate" />
        </div>
        <div class="col-auto column q-ml-md">
          <div class="text-column">End date</div>
          <FieldTextDate :date="filterData.endDate" @update-date="updateEndDate" />
        </div>
        <div class="col-auto column q-ml-md">
          <div class="text-column">No. Invoice</div>
          <FieldText placeholder="Ketikkan invoice..." :value="filterData.invoiceNumber" @update-text="updateInvoiceNumber" />
        </div>
        <div class="col-auto column q-ml-md">
          <div class="text-column">Customer</div>
          <FieldText placeholder="Ketikkan nama..." :value="filterData.customer" @update-text="updateCustomer" />
        </div>
        <div class="col-auto column q-ml-md">
          <div class="text-column">Status Pembayaran</div>
          <FieldDropdown :value="filterData.status" :options="options" @update-value="updateStatus" />
        </div>
      </div>
      <!-- TABLE -->
      <div class="q-py-md">
        <!-- MAKE THIS TABLE CLICKABLE TO NAVIGATE TO OTHER PAGE -->
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="number"
          flat bordered
          table-header-class="bg-blue-2"
          no-data-label="Sorry, I didn't find anything for you"
          rows-per-page-label="Menampilkan:"
          :pagination="pagination"
          class="text-table"
          :loading="invoiceStore.loading"
          @row-click="onRowClick"
        />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import moment from 'moment';
import debounce from 'lodash/debounce';
import {
  defineComponent, onMounted, reactive, watch, 
} from 'vue';
import FieldTextDate from 'src/components/fields/TextDate.vue';
import FieldText from 'components/fields/Text.vue';
import FieldDropdown from 'components/fields/Dropdown.vue';
import { useInvoiceStore } from 'src/stores/invoice';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'TemplateInvoiceListContainer',
  components: { FieldTextDate, FieldText, FieldDropdown },
  setup() {
    const router = useRouter();
    const invoiceStore = useInvoiceStore();
    const options = reactive(['Semua', 'Lunas', 'Sebagian', 'Belum Bayar']);
    
    const date = new Date();

    const filterData = reactive({
      startDate: new Date(date.setMonth(date.getMonth() - 1)),
      endDate: new Date(),
      invoiceNumber: '',
      customer: '',
      status: 'Semua',
    });
    const pagination = reactive({
      rowsPerPage: 25,
    });

    const columns = [
      {
        name: 'number',
        required: true,
        label: 'No. Invoice',
        align: 'left',
        field: (row) => row.invoiceNumber,
        format: (val) => `${val}`,
        sortable: true,
        headerStyle: 'font-weight: 600; font-size: 14px;',
      },
      {
        name: 'id', required: true, 
      },
      {
        name: 'date', align: 'left', label: 'Tanggal Invoice', field: 'date', sortable: true, headerStyle: 'font-weight: 600; font-size: 14px;',
      },
      {
        name: 'customer', align: 'left', label: 'Customer', field: 'customer', sortable: true, headerStyle: 'font-weight: 600; font-size: 14px;',
      },
      {
        name: 'created', label: 'Dibuat Oleh', align: 'left', field: 'createdBy', sortable: true, headerStyle: 'font-weight: 600; font-size: 14px;',
      },
      {
        name: 'value', label: 'Nilai', align: 'right', field: 'value', format: (val) => `Rp. ${val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`, headerStyle: 'font-weight: 600; font-size: 14px;',
      },
      {
        name: 'status', label: 'Status Pembayaran', field: 'status', align: 'center', sortable: true, headerStyle: 'font-weight: 600; font-size: 14px;',
      },
    ];

    const rows = reactive([]);

    function updateStartDate(value) {
      filterData.startDate = value;
    }

    function updateEndDate(value) {
      filterData.endDate = value;
    }

    function updateInvoiceNumber(value) {
      filterData.invoiceNumber = value;
    }

    function updateCustomer(value) {
      filterData.customer = value;
    }

    function updateStatus(value) {
      filterData.status = value;
    }

    function onSuccessGetData(list) {
      rows.splice(0, rows.length, ...list.map((data) => ({
        id: data.id,
        invoiceNumber: data.invoiceNumber,
        date: moment(new Date(data.invoiceDate)).format('DD - MM - YYYY'),
        customer: data.customer,
        createdBy: data.createdBy,
        value: data.invoiceTotal,
        status: capitalize(data.paymentStatus),
      })));
    }

    function capitalize(s) {
      return s && s[0].toUpperCase() + s.slice(1);
    }

    function onRowClick(evt, row) {
      router.push({ name: 'PageInvoiceDetail', params: { slug: row.id } });
    }

    watch(filterData, debounce((newValue) => {
      const {
        startDate, endDate, invoiceNumber, customer, status,
      } = newValue;
      invoiceStore
        .getSearchInvoiceList({
          startDate: moment(new Date(startDate)).format('YYYY-MM-DD'),
          endDate: moment(new Date(endDate)).format('YYYY-MM-DD'),
          invoiceNumber: invoiceNumber === null ? '' : invoiceNumber,
          customer: customer === null ? '' : customer,
          status,
        })
        .then(onSuccessGetData)
        .catch((err) => console.error(err));
    }, 1000));

    onMounted(() => {
      invoiceStore
        .getInvoiceList()
        .then(onSuccessGetData)
        .catch((err) => console.error(err));
    });

    return {
      invoiceStore,
      options,
      filterData,
      rows,
      updateStartDate,
      updateEndDate,
      updateInvoiceNumber,
      updateCustomer,
      updateStatus,
      onSuccessGetData,
      capitalize,
      onRowClick,
      columns,
      pagination,
      date,
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
.text-table {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 14px;
  letter-spacing: 0.005em;
  color: #2b2626;
}
</style>
