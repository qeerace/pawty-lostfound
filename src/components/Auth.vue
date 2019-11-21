<template>
  <div class="text-center">
    <v-dialog v-model="loginModal" width="400" @input="v => v || this.setLoginModal(false)">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" v-if="!isAuth()">
          <v-icon :small="true" color="yellow darken-3">mdi-account-circle</v-icon>
          <span class="mr-2 yellow--text text--darken-3">Sign In</span>
        </v-btn>
        <div class="profile" v-else>
          <div class="text-center">
            <v-menu :close-on-content-click="false" :nudge-width="100" offset-x>
              <template v-slot:activator="{ on }">
                <v-btn text v-on="on">
                  <v-icon size="20" color="yellow darken-3">mdi-account-circle</v-icon>
                  <span
                    class="mr-2 blue-grey--text text--darken-3"
                    style="margin-right:10px;"
                  >{{ displayName() }}</span>
                  <v-icon :small="true" color="blue-grey darken-3">mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-title>My Account</v-list-item-title>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item>
                    <v-list-item-action>
                      <v-btn text :to="'/my-posts'">My Posts</v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red lighten-1 white--text" text @click="logout()">
                      <v-icon :small="true" color="red">mdi-logout</v-icon>
                      <span>Sign Out</span>
                    </v-btn>
                  </v-card-actions>
                </v-list>
              </v-card>
            </v-menu>
          </div>
          <!-- <span style="margin: 10px 10px 0px;">Hi, {{ displayName() }}</span> -->
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
      if (
        firebase
          .auth()
          .currentUser.displayName.substring(0, 1)
          .toUpperCase()
      ) {
        return firebase
          .auth()
          .currentUser.displayName.substring(0, 1)
          .toUpperCase();
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
