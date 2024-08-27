import { defineStore } from 'pinia';
import { callAPIWithAuth } from 'src/boot/axios';

export const useInvoiceStore = defineStore('invoice', {
  state: () => ({
    loading: false,
    list: [],
    detail: null,
  }),

  actions: {
    getInvoiceList() {
      const endpoint = '/invoices';
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

    getSearchInvoiceList({
      startDate, endDate, invoiceNumber, customer, status,
    }) {
      const endpoint = '/invoices';
      return new Promise((resolve, reject) => {
        this.loading = true;
        callAPIWithAuth()
          .get(`${endpoint}?start=${startDate}&end=${endDate}&invoice=${invoiceNumber}&customer=${customer}&status=${status}`)
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

    getInvoiceDetail({ slug }) {
      const endpoint = `/invoices/${slug}`;
      return new Promise((resolve, reject) => {
        this.loading = true;
        callAPIWithAuth()
          .get(endpoint)
          .then((response) => {
            this.detail = response.data.data;
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
