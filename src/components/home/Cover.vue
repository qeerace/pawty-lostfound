<template>
  <v-container class="list">
    <v-card style="margin-top: -80px;">
      <v-responsive :aspect-ratio="16/9">
      <!-- <v-spacer></v-spacer> -->
      <br>
        <v-toolbar flat>
          <v-layout align-center justify-center="">
          <v-toolbar-title class="text-center display-1 font-weight-black">Featured Posts</v-toolbar-title>
          
          </v-layout>
        </v-toolbar>
        <v-card-text>
          <ListPet />
          <!-- <Test /> -->
        </v-card-text>
      </v-responsive>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ListPet from "./ListPet.vue";

export default {
  name: "list",
  components: {
    ListPet
  }
};
</script>
