<template>
  <div class="text-center">
    <v-dialog v-model="loginModal" width="400" @input="v => v || this.setLoginModal(false)">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" v-if="!isAuth()">
          <v-icon :small="true" color="blue-grey darken-3">mdi-account</v-icon>
          <span class="mr-2 yellow--text text--darken-3">Login</span>
        </v-btn>
        <div class="profile" v-else>
          <span style="margin: 10px 10px 0px;">Hi, {{ displayName() }}</span>
          <v-btn color="red lighten-1 white--text" @click="logout()">logout</v-btn>
        </div>
      </template>
      <v-card class="auth-container">
        <div id="firebaseui-auth-container"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Auth",
  data() {
    return {
      // displayName: firebase.auth().currentUser.displayName
    };
  },
  updated() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/",
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
  computed: {
    ...mapGetters(["getLoginModal"]),
    loginModal: {
      set(val) {
        this.setLoginModal(val);
      },
      get() {
        return this.getLoginModal;
      }
    }
  },
  methods: {
    ...mapActions(["setLoginModal"]),
    isAuth() {
      return firebase.auth().currentUser ? true : false;
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$forceUpdate();
        });
      location.reload();
    },
    displayName() {
      if (firebase.auth().currentUser.displayName) {
        return firebase.auth().currentUser.displayName;
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-container {
  padding: 40px 15px 0px 0px;
  display: flex;
  justify-content: center;
  height: 300px;
}
</style>
