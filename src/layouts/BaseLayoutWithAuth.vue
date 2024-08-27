<template>
  <q-layout
    view="lHr LpR lFr"
    v-if="authStore.stateEdited && authStore.validToken"
  >
    <TemplateBaseLayoutHeader />

    <q-page-container class="bg-white">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import TemplateBaseLayoutHeader from 'components/templates/BaseLayout/Header.vue';
import { useAuthStore } from 'src/stores/authentication';
import { useRouter } from 'vue-router';
import {
  NotifyResponseError,
  NotifyResponseErrorWithCaption,
} from 'src/components/mixins/Notification.vue';

export default defineComponent({
  name: 'BaseLayoutWithAuth',
  components: { TemplateBaseLayoutHeader },

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    onMounted(() => {
      authStore.check().catch((err) => {
        if (err.response.status === 401) {
          router.push({ name: 'PageAuthenticationLogout' });
          NotifyResponseError(err.response, 'data');
        }
        if (err.response.status === 403) {
          router.push({ name: 'PageAuthenticationLogout' });
          NotifyResponseErrorWithCaption(this.$t('login_email_not_found'));
        }
        if (err.response.status === 404) {
          router.push({ name: 'PageAuthenticationLogout' });
          NotifyResponseError(err.response, 'data');
        }
      });
    });

    return {
      authStore,
      router,
    };
  },
});
</script>
