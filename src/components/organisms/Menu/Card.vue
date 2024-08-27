<template>
  <div>
    <q-card
      flat
      class="menu-card q-mr-lg"
      @click="goToList(item.route)"
    >
      <div class="row justify-center items-center">
        <q-icon class="q-mt-sm" color="white" size="md" :name="item.icon" />
      </div>
      <div
        class="text-title row justify-center q-mt-xs text-center q-mx-auto"
        style="height: 28px; max-width: 60px"
      >
        {{ item.title }}
      </div>
    </q-card>
  </div>
</template>
<script>
export default {
  name: 'TemplateMenuCard',
  props: {
    item: { type: Object, default: null },
  },
  methods: {
    goToList(page) {
      this.$router.push({ name: page });
    },
  },
};
</script>
<style scoped>
.menu-card {
  width: 80px;
  height: 80px;
  cursor: pointer;
  margin-top: 15px;
  border-radius: 10px;
  background-color: rgb(33, 150, 243);
  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.12) !important;
}
.text-title {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: #ffffff;
}
.menu-icon {
  height: 40px;
}
.icon-filter {
  filter: invert(62%) sepia(95%) saturate(2505%) hue-rotate(187deg)
    brightness(101%) contrast(103%);
}
</style>
