<template>
  <div id="landing-page">
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
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">Login</v-btn>
      </v-col>
    </v-form>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-alert */
import axios from "axios";
import routes from "@/router/index.js";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {
    if (this.$cookie.get("authenticated")) {
      routes.push({ name: "transaction" });
    }
  },
  methods: {
    login() {
      if (this.username !== "" || this.password !== "") {
        axios
          .post("http://localhost:8081/v1/login", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            if (response.data.username !== undefined) {
            this.$cookie.set("authenticated", true);
            this.$cookie.set("display_name", response.data.display_name);
            this.$cookie.set("username", response.data.username);
            this.$cookie.set("password", response.data.password);
            routes.push({ name: "transaction" });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        console.log("A username and password must be present");
      }
    }
  }
};
</script>

<style>
#landing-page {
  background-image: url("../assets/bg-space-center.jpg");
  /* background-color: #8f2c2c; */
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>