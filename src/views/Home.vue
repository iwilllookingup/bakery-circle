<template>
  <div class="home">
    <Navbar />
    <MenuList />
  </div>
</template>
<script>
import MenuList from "@/components/MenuList";
import Navbar from "@/components/Navbar";
import routes from "@/router/index.js";

export default {
  name: "Home",
  mounted (){
    if (!(this.$cookie.get("table_selected") > 0)) {
      routes.push({ name: "register" });
    }
  },
  components: { MenuList, Navbar },
  data: () => ({
    //
  })
};
</script>
