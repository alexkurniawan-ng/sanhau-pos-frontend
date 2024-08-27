<template>
  <q-page>
    <div class="row justify-center q-mx-lg">
      <!-- SEARCH -->
      <div class="col-12 row justify-between q-my-lg" style="margin-left: -16px">
        <q-input
          class="col-auto search-box q-mx-md"
          type="text"
          v-model="query"
          placeholder="Tarik data by ID..."
          borderless
          debounce="300"
          dense
        >
          <template v-slot:prepend>
            <q-icon name="search" size="18px" />
          </template>
        </q-input>
        <div>
          <q-btn class="q-mt-md" dense color="blue" icon="autorenew" />
        </div>
      </div>
     
      <TemplateHomeMenu class="q-px-lg" label="Penjualan" :data="salesMenu" />
      <TemplateHomeMenu class="q-px-lg" label="Surat Jalan" :data="deliveryMenu" />
      <TemplateHomeMenu class="q-px-lg" label="Memo" :data="memoMenu" />
    </div>
  </q-page>
</template>

<script>
import TemplateHomeMenu from 'components/templates/Home/Menu.vue';
import {
  defineComponent, reactive, ref,
} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageMainDashboard',
  components: {
    TemplateHomeMenu,
  },
  setup() {
    const router = useRouter();
    
    const query = ref(null);

    const salesMenu = reactive([{
      icon: 'o_note_add',
      title: 'Buat Invoice',
      route: 'PageInvoiceCreate',
    }, {
      icon: 'list_alt',
      title: 'List Invoice',
      route: 'PageMainInvoice',
    }, {
      icon: 'o_note_add',
      title: 'Buat Proforma',
      route: 'PageProformaCreate',
    }, {
      icon: 'list_alt',
      title: 'List Proforma',
      route: 'PageMainProforma',
    }]);

    const deliveryMenu = reactive([{
      icon: 'o_note_add',
      title: 'Buat Surat Jalan',
      route: 'PageDeliveryOrderCreate',
    }, {
      icon: 'list_alt',
      title: 'List Surat Jalan',
      route: 'PageMainDeliveryOrder',
    }, {
      icon: 'local_shipping',
      title: 'Kiriman Hari ini',
      route: 'PageDeliveryOrderToday',
    }]);

    const memoMenu = reactive([{
      icon: 'o_note_add',
      title: 'Buat Memo',
      route: 'PageMemoCreate',
    }, {
      icon: 'list_alt',
      title: 'List Memo',
      route: 'PageMainMemo',
    }]);

    return {
      router,
      query,
      salesMenu,
      deliveryMenu,
      memoMenu,
    };
  },
});
</script>
<style scoped>
.search-box {
  font-family: "Poppins";
  border-radius: 8px;
  font-size: 12px;
  border: 1px solid #d6d6d6;
  margin-top: 15px;
  padding-left: 10px;
  width: 300px;
}

</style>
