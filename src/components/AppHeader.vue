<template>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn @click="goHome()" class="d-flex" color="transparent">
          <v-icon :size="30" style="cursor: pointer;" color="yellow darken-3">mdi-paw</v-icon>
          <span class="pawty blue-grey--text text--darken-3 title">Pawty</span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">
        <v-icon :small="true" color="yellow darken-3">mdi-home</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3" style="margin-right:10px;">Home</span>
      </v-btn>
      <v-btn text to="/post">
        <v-icon :small="true" color="yellow darken-3">mdi-post</v-icon>
        <span class="mr-2 blue-grey--text text--darken-3">Report here!</span>
      </v-btn>
      <Auth />
    </v-app-bar>
</template>

<script>
import Auth from "./Auth";
export default {
  name: "AppHeader",
  components: {
    Auth
  },
  methods: {
    goHome() {
      if (this.$route.name != "home") {
        this.$router.push({ name: "home" }).catch();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.pawty {
  margin-right: 10px;
  cursor: pointer;
  pointer-events: auto;
}
</style>
