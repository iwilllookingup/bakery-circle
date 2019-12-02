<template>
  <div v-if="tables.length > 0">
    <AdminNavbar />
    <v-card>
      <v-card-title>
        Table Status Manager
        <v-spacer></v-spacer>
      </v-card-title>

      <v-data-table :headers="headers" :items="tables" class="elevation-1">
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getColor(item.status)"
            dark
            @click="changeStatus(item.table_id)"
          >{{ item.status }}</v-chip>

          <v-dialog v-model="dialog" max-width="400px">
            <v-card>
              <v-card-title>Change Status</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: 170px;">
                <v-radio-group v-model="statusToChange" column>
                  <v-radio label="available" value="available"></v-radio>
                  <v-radio label="busy" value="busy"></v-radio>
                  <v-radio label="charging" value="charging"></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="updateStatus">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
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
  components: { AdminNavbar },
  data() {
    return {
      tableIDToChange: 0,
      statusToChange: "",
      dialog: false,
      headers: [
        {
          text: "Table ID",
          align: "center",
          sortable: false,
          value: "table_id"
        },
        { text: "Status", align: "center", value: "status" },
        {
          text: "Location",
          align: "center",
          value: "location",
          sortable: false
        }
      ],
      tables: []
    };
  },
  watch: {
    dialog(val) {
      if (val == false) {
        this.tableIDToChange = 0;
        this.statusToChange = "";
      }
    }
  },
  mounted() {
   if (!this.$cookie.get("authenticated")) {
      routes.push({ name: "login" });
    } else {
      this.initialize();
    }

    setInterval(() => {
      this.initialize();
    }, 2500);

  },
  methods: {
    updateStatus() {
      let changeStatus = this.statusToChange;
      let operationTableID = this.tableIDToChange;
      axios
        .put("http://localhost:8081/v1/table/".concat(this.tableIDToChange), {
          status: this.statusToChange
        })
        .then(() => {
          if (changeStatus == "busy") {
            axios.post("http://localhost:8081/v1/transaction", {
              table_id: operationTableID
            });
          }

          this.initialize();
        })
        .catch(error => {
          console.log(error);
        });

      //   this.initialize();
      this.statusToChange = "";
      this.dialog = false;
    },
    changeStatus(tableID) {
      this.tableIDToChange = tableID;
      this.dialog = true;
    },
    getColor(status) {
      if (status == "busy") return "red";
      else if (status == "charging") return "orange";
      else return "green";
    },
    initialize() {
      axios
        .get("http://localhost:8081/v1/tables")
        .then(response => {
          this.tables = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>