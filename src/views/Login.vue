<template>
  <div id="login" class="d-flex justify-center align-center">
    <v-card flat>
      <v-card-title>
        <h2 class="grey--text text--darken-3">Authentication Required</h2>
      </v-card-title>
      <v-card-text>
        Please login to be able to perform the action.
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.setLoginModal(true);
  },
  methods: {
    ...mapActions(["setLoginModal"])
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 40vh;
}
</style>
