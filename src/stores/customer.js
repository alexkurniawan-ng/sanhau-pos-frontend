import { defineStore } from 'pinia';
import { callAPIWithAuth } from 'src/boot/axios';

export const useCustomerStore = defineStore('customer', {
  state: () => ({
    loading: false,
    list: [],
    detail: null,
  }),

  actions: {
    getCustomerList() {
      const endpoint = '/customers';
      return new Promise((resolve, reject) => {
        this.loading = true;
        callAPIWithAuth()
          .get(endpoint)
          .then((response) => {
            this.list = response.data.data;
            this.loading = false;
            resolve(response.data.data);
          })
          .catch((err) => {
            this.loading = false;
            reject(err);
          });
      });
    },

    getSearchCustomerList({ name }) {
      const endpoint = '/customers/search';
      return new Promise((resolve, reject) => {
        this.loading = true;
        callAPIWithAuth()
          .get(`${endpoint}?name=${name}`)
          .then((response) => {
            this.list = response.data.data;
            this.loading = false;
            resolve(response.data.data);
          })
          .catch((err) => {
            this.loading = false;
            reject(err);
          });
      });
    },

  },
});
