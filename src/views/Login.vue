<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-img
      src="@/assets/login.svg"
      aspect-ratio="1"
      max-width="200"
      max-height="200"
      class="mx-auto"
    ></v-img>

    <v-col cols="6" sm="3" class="mx-auto">
      <v-text-field v-model="username" label="Username" required></v-text-field>
    </v-col>

    <v-col cols="6" sm="3" class="mx-auto">
      <v-text-field v-model="password" :type="'password'" label="Password" required></v-text-field>
    </v-col>

    <v-col cols="6" sm="1" class="mx-auto">
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Login</v-btn>
    </v-col>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    username: "",
    password: ""
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    }
  }
};
</script>