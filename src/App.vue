<template>
  <v-app>
    <!-- <v-parallax src="@/assets/bg.jpg"> -->
      <v-content>
        <router-view></router-view>
      </v-content>
    <!-- </v-parallax> -->
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    //
  })
};
</script>
