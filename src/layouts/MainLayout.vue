<template>
  <q-layout view="lHh Lpr lFf">
    <TemplateMainLayoutHeader />
    <q-page-container class="bg-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import TemplateMainLayoutHeader from 'components/templates/MainLayout/Header.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    TemplateMainLayoutHeader,
  },
});
</script>
