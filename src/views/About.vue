<template>
  <div>
    <Navbar />
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    <blockquote
      class="blockquote"
    ></blockquote>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import routes from "@/router/index.js";
export default {
  mounted() {
    if (!(this.$cookie.get("table_selected") > 0)) {
      routes.push({ name: "register" });
    }
  },
  components: { Navbar },
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ]
    };
  }
};
</script>