<template>
  <v-toolbar color="grey" dense>
    <v-toolbar-title class="font-weight-light">Circle</v-toolbar-title>
    <v-toolbar-title>Management</v-toolbar-title>
    <v-toolbar-items class="mx-auto">
      <v-btn text to="/transaction">Transaction</v-btn>
      <v-btn text to="/menu">Menu</v-btn>
      <v-btn text to="/table">Table</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn icon @click="logout">
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import routes from "@/router/index.js";
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$cookie.delete("authenticated");
      this.$cookie.delete("display_name");
      this.$cookie.delete("username");
      this.$cookie.delete("password");
      routes.push({ name: "login" });
    }
  }
};
</script>