<template>
  <div>
    <Navbar />
    <v-row>
      <v-card max-width="344" class="ma-3 pa-6" outlined tile>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">FACEBOOK</v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80">
            <v-img src="@/assets/fb.png" aspect-ratio="1" max-width="150" max-height="150"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn text>Follow</v-btn>
        </v-card-actions>
      </v-card>

      <v-card max-width="344" class="ma-3 pa-6" outlined tile>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">INSTARGRAM</v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-avatar tile size="80">
            <v-img src="@/assets/ig.png" aspect-ratio="1" max-width="150" max-height="150"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn text>Follow</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>


<script>
import Navbar from "@/components/Navbar";
export default {
  components: { Navbar },
  data() {
    return {};
  }
};
</script>