<template>
  <div id="landing-page">
    <v-alert v-model="alert" dense border="left" type="warning">{{alertMsg}}</v-alert>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
          <v-card-title>
            <span class="headline">Register Table</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-select v-model="selectTableID" :items="tableIDList" label="Table ID" required></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="register()">register</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-alert */
import routes from "@/router/index.js";
import axios from "axios";
export default {
  mounted() {
    this.getTableIDList();
    if (this.$cookie.get("table_selected") > 0) {
      routes.push({ name: "order" });
    }
  },
  data: () => ({
    selectTableID: 0,
    tableIDList: [],
    dialog: true,
    alert: false,
    alertMsg: "Please select the table"
  }),
  methods: {
    getTableIDList() {
      axios
        .get("http://localhost:8081/v1/tables")
        .then(response => {
          response.data.forEach(v => {
            this.tableIDList.push(v.table_id);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    register() {
      if (this.selectTableID > 0) {
        this.$cookie.set("table_selected", this.selectTableID);
        routes.push({ name: "order" });
      } else {
        this.alert = true;
      }
    }
  }
};
</script>

<style>
#landing-page {
  background-image: url("../assets/bg-bread.jpg");
  /* background-color: #8f2c2c; */
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>