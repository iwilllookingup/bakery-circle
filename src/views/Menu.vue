<template>
  <div id="landing-page" v-if="menus.length > 0">
    <!-- <v-alert
      :value="alert"
      :dismissible="alert"
      color="success"
      outline
    >{{ successOperation }}</v-alert>-->
    <AdminNavbar />
    <v-data-table :headers="headers" :items="menus" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Menus Menager</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.menu_name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.image_uri" label="Image Link"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">{{ icons.mdiPencil }}</v-icon>
        <v-icon small @click="deleteItem(item)">{{ icons.mdiDelete }}</v-icon>
      </template>
    </v-data-table>
  </div>
</template>


<script>
/* eslint-disable no-console */
/* eslint-disable no-alert */
import AdminNavbar from "@/components/AdminNavbar";
import { mdiPencil, mdiDelete } from "@mdi/js";
import axios from "axios";
import routes from "@/router/index.js";
export default {
  components: { AdminNavbar },
  data: () => ({
    icons: {
      mdiPencil,
      mdiDelete
    },
    dialog: false,
    headers: [
      {
        text: "ID",
        align: "left",
        value: "menu_id"
      },
      { text: "Name", value: "menu_name" },
      { text: "Price", value: "price" },
      { text: "Description", value: "description", sortable: false },
      { text: "Image Link", value: "image_uri", sortable: false },
      { text: "Type", value: "type" },
      { text: "Actions", value: "action", sortable: false }
    ],
    menus: [],
    editedIndex: -1,
    alert: false,
    successOperation: "",
    editedItem: {
      menu_id: 0,
      menu_name: "",
      price: 0,
      description: "",
      image_uri: "",
      type: ""
    }
  }),
  mounted() {
    if (!this.$cookie.get("authenticated")) {
      routes.push({ name: "login" });
    } else {
      this.initialize();
    }
  },
  methods: {
    showAlert(msg) {
      this.successOperation = msg;

      this.alert = true;
    },
    initialize() {
      axios
        .get("http://localhost:8081/v1/menus")
        .then(response => {
          this.menus = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getMenus() {
      axios
        .get("http://localhost:8081/v1/menus")
        .then(function(response) {
          this.menus = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedIndex = this.menus.indexOf(item);
      this.editedItem = item;
      this.dialog = true;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        axios
          .delete(
            "http://localhost:8081/v1/menu/"
              .concat(item.menu_id)
              .concat("/delete")
          )
          .then(() => {
            this.initialize();
            this.dialog = false;
          })
          .catch(function(error) {
            console.log(error);
          });
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        axios
          .put(
            "http://localhost:8081/v1/menu/"
              .concat(this.editedItem.menu_id)
              .concat("/update"),
            {
              menu_name: this.editedItem.menu_name,
              price: this.editedItem.price,
              type: this.editedItem.type,
              description: this.editedItem.description,
              img_uri: this.editedItem.image_uri
            }
          )
          .then(() => {
            this.initialize();
            this.dialog = false;
            this.showAlert("Update menu success");
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        axios
          .post("http://localhost:8081/v1/menu", {
            menu_name: this.editedItem.menu_name,
            price: this.editedItem.price,
            type: this.editedItem.type,
            description: this.editedItem.description,
            img_uri: this.editedItem.image_uri
          })
          .then(() => {
            this.initialize();
            this.dialog = false;
            this.showAlert("Create menu success");
          })
          .catch(function(error) {
            console.log(error);
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