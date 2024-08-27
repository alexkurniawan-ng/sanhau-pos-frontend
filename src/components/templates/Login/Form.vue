<template>
  <div class="row col-12 q-px-lg">
    <div class="col-12 q-pt-lg">
      <div class="text-login">Sign in</div>
      <p class="text-washed q-mt-sm">Please login to continue</p>
    </div>
    <div class="col-12 q-pt-sm">
      <FieldTextEmail
        v-model="fields.email"
        :label="'Email'"
        required
      />
    </div>
    <div class="col-12">
      <FieldTextPassword
        v-model="fields.password"
        :label="'Password'"
        required
      />
    </div>
    <div class="col-12 q-mb-md">
      <q-checkbox class="text-keep" size="xs" v-model="keepLogin" val="xs" label="Keep me logged in" />
    </div>
    <div class="col-12">
      <q-btn
        class="btn-login full-width"
        label="Sign in"
        no-caps
        @click="onSubmit"
        />
        <!-- :disable="authStore.loading"
        :loading="authStore.loading" -->
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
// import { useAuthStore } from 'src/stores/authentication';
import FieldTextEmail from 'components/fields/TextEmail.vue';
import FieldTextPassword from 'components/fields/TextPassword.vue';
import {
  NotifyResponseError,
  NotifyResponseErrorWithCaption,
} from 'components/mixins/Notification.vue';

export default defineComponent({
  name: 'TemplateLoginForm',
  components: { FieldTextEmail, FieldTextPassword },
  setup() {
    const router = useRouter();
    // const authStore = useAuthStore();

    const fields = reactive({
      email: null,
      password: null,
    });

    const keepLogin = ref(false);

    function goToReset() {
      router.push({ name: 'PageAuthenticationResetPassword' });
    }

    function onSubmit() {
      // const { email, password } = fields;
      // authStore
      //   .login(email, password)
      //   .then(onSubmitSuccess)
      //   .catch(onSubmitError);
    }

    function onSubmitSuccess(response) {
      window.localStorage.setItem('token', response.accessToken);
      router.replace({ name: 'PageMainDashboard' });
    }

    function onSubmitError(err) {
      console.log({ err });
      if (err.response.data.code === 401) {
        NotifyResponseErrorWithCaption('Email or Password invalid');
      } else if (err.response.data.data.includes('User not found.')) {
        NotifyResponseErrorWithCaption('Email or Password is invalid');
      } else if (err.response.data.data.includes('Revoke user.')) {
        NotifyResponseErrorWithCaption(
          "You can't access this app, because your account is inactive.",
        );
      } else {
        NotifyResponseError(err.response, 'data');
      }
    }

    return {
      fields,
      router,
      // authStore,
      keepLogin,
      goToReset,
      onSubmit,
      onSubmitSuccess,
      onSubmitError,
      NotifyResponseError,
      NotifyResponseErrorWithCaption,
    };
  },
});
</script>

<style scoped>
.text-login {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.019em;
  color: #1a1a1a;
}
.text-keep {
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.019em;
  color: #1a1a1a;
}
.text-washed {
  color: #b9b9b9;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: -0.3px;
}
.btn-login {
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.005em;
  color: #ffffff;
  background-color: #4da6ff;
  border-radius: 6px;
  height: 46px;
}
.separator {
  border-top: 1px solid #b9b9b9;
  width: 118px;
  margin-top: 5px;
}
</style>
