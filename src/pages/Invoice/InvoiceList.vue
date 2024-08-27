<template>
  <q-page>
    <div class="q-mx-lg">
      <div class="row justify-between q-my-lg">
        <div class="col text-title">List Invoice</div>
        <div class="col row justify-end">
          <q-btn 
            class="btn-create" 
            no-caps 
            label="+ Buat Invoice"
            @click="goToForm"
          />
        </div>
      </div>
      <TemplateInvoiceListContainer />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import TemplateInvoiceListContainer from 'components/templates/Invoice/ListContainer.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageMainInvoice',
  components: { TemplateInvoiceListContainer },
  setup() {
    const router = useRouter();

    function goToForm() {
      router.push({ name: 'PageInvoiceCreate' });
    }

    return {
      router,
      goToForm,
    };
  },
});
</script>
<style scoped>
.text-title {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.9);
}
.btn-create {
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.055em;
  border-radius: 6px;
  background-color: #4da6ff;
  color: #ffffff;
}
</style>
