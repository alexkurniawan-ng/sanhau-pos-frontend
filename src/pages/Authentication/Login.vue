<template>
  <div class="row justify-center items-center q-pa-md">
    <q-card class="card-login col">
      <q-card-section>
        <TemplateLoginLogo />
        <TemplateLoginForm />
        <div class="col row justify-center q-pt-lg q-px-sm">
          <p class="text-washed cursor-pointer">
            Need an account?
            <span class="text-main cursor-pointer" @click="signUp"
              >Create one</span
            >
          </p>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
// mounted() {
//   this.$store.dispatch('authentication/check')
//     .then(() => {
//       this.$router.replace({ name: 'PageMainHome' });
//     })
//     .catch((err) => {
//       if (err.response.status === 401) return;
//       if (err.response.status === 404) {
//         this.NotifyResponseError(err.response, 'data');
//       }
//     });
// },
import TemplateLoginForm from 'components/templates/Login/Form.vue';
import TemplateLoginLogo from 'components/templates/Login/Logo.vue';

import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'PageAuthenticationLogin',
  components: {
    TemplateLoginForm,
    TemplateLoginLogo,
  },
  setup() {
    const router = useRouter();

    function signUp() {
      router.push({ name: 'PageAuthenticationRegister' });
    }

    function onSubmitSuccess(response) {
      window.localStorage.setItem('token', response.accessToken);
      router.replace({ name: 'PageMainHome' });
    }

    function onSubmitError(err) {
      // if (err.response.data.data.includes("Invalid credentials.")) {
      //   this.NotifyResponseErrorWithCaption(this.$t("login_password_invalid"));
      // } else if (err.response.data.data.includes("User not found.")) {
      //   this.NotifyResponseErrorWithCaption(this.$t("login_email_not_found"));
      // } else if (err.response.data.data.includes("Revoke user.")) {
      //   this.NotifyResponseErrorWithCaption(
      //     "You can't access this app, because your account is inactive."
      //   );
      // } else {
      // this.NotifyResponseError(err.response, "data");
      // }
      console.log(err);
    }
    return {
      router,
      signUp,
      onSubmitSuccess,
      onSubmitError,
    };
  },
});
</script>

<style scoped>
.card-login {
  max-width: 400px;
  margin-top: 3vh;
  height: 90vh;
}
.text-washed {
  color: #b9b9b9;
  text-align: center;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.3px;
}
.text-main {
  color: #4da6ff;
  font-family: Poppins;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 12px;
  letter-spacing: -0.3px;
  text-decoration: underline;
}
</style>
