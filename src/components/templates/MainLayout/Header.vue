<template>
  <q-header class="bg-white main-header">
    <div class="container row justify-between q-mx-lg">
      <div class="col-auto row">
        <!-- LOGO -->
        <div class="col-auto cursor-pointer">
          <img src="/images/logo.png" style="height: 50px; margin-top: 10px" @click="goToHome" />
        </div>
        
        <!-- SEARCH -->
        <div class="col-auto">
          <q-input
            class="search-box q-mx-md"
            type="text"
            v-model="query"
            placeholder="Cari nama produk disini..."
            borderless
            debounce="300"
            dense
          >
            <template v-slot:prepend>
              <q-icon name="search" size="18px" />
            </template>
          </q-input>
        </div>
      </div>

      <div class="col row justify-end">
        <!-- MENU -->
        <q-btn
          flat
          no-caps
          type="a"
          :class="invoiceTab"
          label="Invoice"
          :to="{ name: 'PageMainInvoice' }"
        />
        <q-btn
          flat
          no-caps
          type="a"
          :class="deliveryOrderTab"
          label="Surat Jalan"
          :to="{ name: 'PageMainDeliveryOrder' }"
        />
        <q-btn
          flat
          no-caps
          type="a"
          :class="proformaTab"
          label="Proforma Invoice"
          :to="{ name: 'PageMainProforma' }"
        />
        <q-btn
          flat
          no-caps
          type="a"
          :class="memoTab"
          label="Memo"
          :to="{ name: 'PageMainMemo' }"
        />
          
        <!-- PROFILE -->
        <q-btn
          flat
          no-caps
          type="a"
          :class="profileTab"
          label="Profile"
          icon="account_circle"
        />
      </div>
    </div>
  </q-header>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'TemplateMainLayoutHeader',

  // TODO: PERFORM CHECK TO GET USER

  setup() {
    const route = useRoute();
    const router = useRouter();
    const query = ref(null);

    const currentPage = computed(() => route.name);
    const invoiceTab = computed(() => {
      return currentPage.value.includes('Invoice') ? 'text-navbar-active' : 'text-navbar';
    });
    const profileTab = computed(() => {
      return currentPage.value.includes('Profile') ? 'text-navbar-active' : 'text-navbar';
    });
    const deliveryOrderTab = computed(() => {
      return currentPage.value.includes('Delivery') ? 'text-navbar-active' : 'text-navbar';
    });
    const proformaTab = computed(() => {
      return currentPage.value.includes('Proforma') ? 'text-navbar-active' : 'text-navbar';
    });
    const memoTab = computed(() => {
      return currentPage.value.includes('Memo') ? 'text-navbar-active' : 'text-navbar';
    });

    function goToHome() {
      router.push({ name: 'PageMainHome' });
    }

    // onMounted(() => {
    //   authStore
    //     .check()
    //     .then(getDashboard)
    //     .catch((err) => console.error(err))
    //     .finally(onCheckUser);
    // });

    return {
      route,
      router,
      query,
      currentPage,
      invoiceTab,
      profileTab,
      deliveryOrderTab,
      proformaTab,
      memoTab,
      goToHome,
    };
  },
});
</script>

<style scoped>
.main-header {
  height: 70px;
  margin: 0 auto;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
}
.container {
  max-width: 1920px;
}
.main-header .column {
  padding-top: 10px;
  padding-bottom: 10px;
}
.main-header .column :deep(.q-btn__wrapper) {
  padding: 0px;
}
.text-navbar {
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.005em;
  color: #2b2626;
}
.text-navbar-active {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.005em;
  color: #0080ff;
}
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
