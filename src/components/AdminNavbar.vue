<template>
  <v-toolbar dense>
    <v-toolbar-title class="font-weight-light">Circle</v-toolbar-title>
    <v-toolbar-title>Management</v-toolbar-title>
    <v-toolbar-items class="mx-auto">
      <v-btn text to="/transaction">Transaction</v-btn>
      <v-btn text to="/menu">Menu</v-btn>
      <v-btn text to="/table">Table</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-exit-to-app</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>