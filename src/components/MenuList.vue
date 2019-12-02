<template>
  <div id="landing-page">
    <v-toolbar class="mx-auto" src="../assets/bg.jpg">
      <v-toolbar-items class="mx-auto">
        <v-btn color="indigo" text @click="getBakeryList">
          Bakery
          <v-icon>mdi-baguette</v-icon>
        </v-btn>
        <v-btn color="orange" text @click="getCoffeeList">
          Drink
          <v-icon>mdi-coffee</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-sheet class="mx-auto" elevation="8" color="grey">
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
        :multiple="true"
      >
        <v-slide-item v-for="n in menus" :key="n.menu_id" v-slot:default="{ active, toggle }">
          <v-card
            :color="active ? undefined : 'grey lighten-1'"
            class="ma-4"
            height="250"
            width="250"
            @click="editItem(n)"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-img
                v-if="n.image_uri !== null"
                class="white--text align-end"
                height="250"
                width="250"
                :src="n.image_uri"
              ></v-img>

              <v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="8">
                <v-text-field v-model="editedItem.menu_name" label="Name" disabled></v-text-field>
              </v-col>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.price" label="Price" disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedItem.quantity" label="Qantity"></v-text-field>
                </v-col>
              </v-row>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="order">Order</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      v-if="orderItems.length > 0"
      :headers="headers"
      :items="orderItems"
      class="elevation-1"
      hide-default-footer
    ></v-data-table>

    <v-btn
      v-if="orderItems.length > 0"
      class="ma-2"
      tile
      color="indigo"
      dark
      right="true"
      @click="summaryPrice"
    >
      Check Bill
      <v-icon>mdi-briefcase-check</v-icon>
    </v-btn>

    <v-row justify="center">
      <v-dialog v-model="DialogOn" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">
            Please waiting until table available
            <v-spacer></v-spacer>
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="confirmDialog" persistent max-width="350">
        <v-card>
          <v-card-title class="headline">Summary Order Price</v-card-title>
          <v-card-text
            v-for="n in orderItems"
            :key="n.menu_id"
          > {{n.quantity}} {{n.menu_name}} = {{n.menu_price * n.quantity}} baht</v-card-text>
          <div>
          <v-card-text>Total Price = {{totalPrice}} baht</v-card-text>
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="cancelSummary">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="checkBill">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
import axios from "axios";
export default {
  data: () => ({
    DialogOn: false,
    confirmDialog: false,
    model: null,
    menus: [],
    tableID: 0,
    transactionID: 0,
    orderItems: [],
    dialog: false,
    editedItem: {
      menu_id: 0,
      menu_name: "",
      price: 0,
      quantity: 0
    },
    totalPrice: 0,
    headers: [
      { text: "Name", value: "menu_name" },
      { text: "Price per piece", value: "menu_price" },
      { text: "Quantity", value: "quantity" }
    ]
  }),
  mounted() {
    if (this.$cookie.get("table_selected") > 0) {
      this.tableID = this.$cookie.get("table_selected");
    }
    this.getBakeryList();
    this.initialTransactionID();

    setInterval(() => {
      this.initialTransactionID();
    }, 5000);
  },
  watch: {
    transactionID(val) {
      if (val == 0) {
        this.DialogOn = true;
      } else {
        this.DialogOn = false;
      }
    }
  },
  methods: {
    cancelSummary() {
      this.totalPrice = 0;
      this.confirmDialog = false;
    },
    initialTransactionID() {
      axios
        .get("http://localhost:8081/v1/transaction/".concat(this.tableID))
        .then(response => {
          this.transactionID = response.data.transaction_id;
          axios
            .get("http://localhost:8081/v1/order/".concat(this.transactionID))
            .then(response => {
              this.orderItems = response.data;
            });
        })
        .catch(() => {
          if (this.transactionID == 0) {
            this.DialogOn = true;
          }
        });
    },
    editItem(item) {
      this.editedItem.price = item.price;
      this.editedItem.menu_name = item.menu_name;
      this.editedItem.menu_id = item.menu_id;
      this.editedItem.quantity = 1;
      this.dialog = true;
    },
    deleteItem(item) {
      let index = this.selectedMenu.indexOf(item);
      this.selectedMenu.splice(index, 1);
    },
    close() {
      this.dialog = false;
    },
    summaryPrice() {
      this.orderItems.forEach(val => {
        this.totalPrice = this.totalPrice + val.menu_price * val.quantity;
      });
      this.confirmDialog = true;
    },
    checkBill() {
      this.orderItems = [];
      this.confirmDialog = false;
      axios.put(
        "http://localhost:8081/v1/transaction/".concat(this.transactionID)
      );

      axios
        .put("http://localhost:8081/v1/table/".concat(this.tableID), {
          status: "charging"
        })
        .then(() => {})
        .catch(error => {
          console.log(error);
        });

      this.transactionID = 0;
      // this.initialTransactionID();
    },
    getBakeryList() {
      axios.get("http://localhost:8081/v1/menus/bakery").then(response => {
        this.menus = response.data;
      });
    },
    getCoffeeList() {
      axios.get("http://localhost:8081/v1/menus/drink").then(response => {
        this.menus = response.data;
      });
    },
    order() {
      if (this.editedItem.quantity > 0) {
        if (this.transactionID == 0) {
          axios
            .get("http://localhost:8081/v1/transaction/".concat(this.tableID))
            .then(response => {
              this.transactionID = response.data.transaction_id;
            });
        }

        axios
          .post("http://localhost:8081/v1/order", {
            menu_id: this.editedItem.menu_id,
            transaction_id: this.transactionID,
            quantity: this.editedItem.quantity,
            menu_price: this.editedItem.price,
            menu_name: this.editedItem.menu_name
          })
          .then(() => {
            axios
              .get("http://localhost:8081/v1/order/".concat(this.transactionID))
              .then(response => {
                this.orderItems = response.data;
              });
          });
      }

      this.close();
    }
  }
};
</script>

<style>
#landing-page {
  background-image: url("../assets/bg.jpg");
  /* background-color: #8f2c2c; */
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>