<template>
  <q-layout view="Lhr LpR lfr">
    <q-page-container>
      <q-page class=" bg-white">
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'BaseLayout',
};
</script>
