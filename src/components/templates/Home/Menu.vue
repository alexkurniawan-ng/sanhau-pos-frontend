<!-- eslint-disable vue/valid-v-bind -->
<template>
  <q-card class="col-12 card-container q-mb-xl">
    <div class="col-12 q-mt-md text-title">{{ label }}</div>
    <div class="col-12 row q-mb-lg">
      <div class="col-auto" v-for="(item, index) in data" :key="index">
        <TemplateMenuCard :item="item" />
      </div>
    </div>
  </q-card>
</template>

<script>
import TemplateMenuCard from 'components/organisms/Menu/Card.vue';

export default {
  name: 'TemplateHomeMenu',
  components: { TemplateMenuCard },
  props: {
    label: { type: String, default: null },
    data: { type: Array, default: null },
  },
};
</script>

<style scoped>
.card-container {
  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.12);
  /* gap: 8%; */
}
.text-title {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.9);
}
</style>
