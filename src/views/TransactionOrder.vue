<template>
  <div>
    <AdminNavbar />

    <v-card>
      <v-card-title>
        Transaction's orders
        <v-spacer></v-spacer>
        <v-btn text to="/transaction"><v-icon>mdi-arrow-left-bold</v-icon> view transactions</v-btn>
      </v-card-title>
      <v-data-table :headers="headers" :items="orders" :search="search"></v-data-table>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-alert */
import AdminNavbar from "@/components/AdminNavbar";
import axios from "axios";
import routes from "@/router/index.js";
export default {
  name: "transaction_order",
  components: { AdminNavbar },
  data() {
    return {
      transactionID: 0,
      search: "",
      headers: [
        {
          text: "Order ID",
          align: "left",
          value: "order_id"
        },
        { text: "Transaction ID", value: "transaction_id" },
        { text: "Menu ID", value: "menu_id" },
        { text: "Menu Name", value: "menu_name" },
        { text: "Menu Price", value: "menu_price" },
        { text: "Quantity", value: "quantity" }
      ],
      orders: []
    };
  },
  mounted() {
    if (!this.$cookie.get("authenticated")) {
      routes.push({ name: "login" });
    } else {
      this.initialize();
    }
  },
  created() {
    this.transactionID = this.$route.params.transaction_id;
  },
  watch: {
    transactionID(val) {
      if (val !== 0) {
        this.initialize();
      }
    }
  },
  methods: {
    initialize() {
      axios
        .get("http://localhost:8081/v1/order/".concat(this.transactionID))
        .then(response => {
          this.orders = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>