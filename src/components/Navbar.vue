<template>
  <v-card color="grey lighten-4" flat tile>
    <v-toolbar color="grey" dense>
      <v-toolbar-title class="font-weight-light">Bakery</v-toolbar-title>
      <v-toolbar-title>Circle</v-toolbar-title>
       <v-toolbar-items class="mx-auto">
         <v-btn text to="/order">Order</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-btn text to="/contact">Contact</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>