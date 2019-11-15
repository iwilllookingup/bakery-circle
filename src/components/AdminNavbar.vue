<template>
  <div>
    <v-toolbar color="grey" dense>
      <v-toolbar-title class="font-weight-light">Circle</v-toolbar-title>
      <v-toolbar-title>Management</v-toolbar-title>
      <v-toolbar-items class="mx-auto">
        <v-btn text to="/transaction">Transaction</v-btn>
        <v-btn text to="/menu">Menu</v-btn>
        <v-btn text to="/table">Table</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-btn icon @click="dialog = true">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="350">
        <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
        </template> -->
        <v-card>
          <v-card-title class="headline">Are you sure to logout ?</v-card-title>
          <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="logout">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import routes from "@/router/index.js";
export default {
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    logout() {
      this.$cookie.delete("authenticated");
      this.$cookie.delete("display_name");
      this.$cookie.delete("username");
      this.$cookie.delete("password");
      routes.replace({ name: "login" });
    }
  }
};
</script>