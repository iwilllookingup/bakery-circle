<template>
  <div v-if="transactions.length > 0">
    <AdminNavbar />

    <v-card>
      <v-card-title>
        Transactions
        <v-spacer></v-spacer>
        <!-- <v-col cols="12" sm="3">
          <v-text-field v-model="search" label="Search" single-line hide-details></v-text-field>
        </v-col> -->
      </v-card-title>
      <v-data-table :headers="headers" :items="transactions" :search="search">
        <template v-slot:item.action="{ item }">
          <router-link
            :to="{name: 'transaction_order' , params : {transaction_id:item.transaction_id} }"
          >
            <v-icon small class="mr-2">{{icons.mdiLoupe}}</v-icon>
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-alert */
import AdminNavbar from "@/components/AdminNavbar";
import { mdiLoupe } from "@mdi/js";
import axios from "axios";
// import EventBus from "@/event-bus";
import routes from "@/router/index.js";
export default {
  components: { AdminNavbar },
  data() {
    return {
      icons: {
        mdiLoupe
      },
      search: "",
      headers: [
        {
          text: "Transaction ID",
          align: "center",
          value: "transaction_id"
        },
        {
          text: "Table ID",
          align: "center",
          value: "table_id",
          sortable: false
        },
        { text: "Total Price", align: "center", value: "total_price" },
        {
          text: "Transaction Date",
          align: "center",
          value: "transaction_date"
        },
        {
          text: "Order Details",
          align: "center",
          value: "action",
          sortable: false
        }
      ],
      transactions: []
    };
  },
  mounted() {
    // EventBus.$on("authenticated", function(isAuthen) {
    if (!this.$cookie.get("authenticated")) {
      routes.push({ name: "login" });
    } else {
      this.initialize();
    }
  },
  methods: {
    initialize() {
      axios
        .get("http://localhost:8081/v1/transactions")
        .then(response => {
          this.transactions = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
