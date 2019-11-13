<template>
  <div class="home">
    <Navbar />
    <MenuList />
  </div>
</template>
<script>
import MenuList from "@/components/MenuList";
import Navbar from "@/components/Navbar";

export default {
  name: "Home",
  components: { MenuList, Navbar },
  data: () => ({
    //
  })
};
</script>
