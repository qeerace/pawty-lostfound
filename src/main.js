import Vue from "vue";
import VueDisqus from "vue-disqus";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import App from "./App.vue";
import axios from "axios";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import lineClamp from "vue-line-clamp";
import { firebaseConfig } from "../firebase.config";

let app = "";
var SocialSharing = require("vue-social-sharing");

Vue.config.productionTip = false;
Vue.use(VueDisqus);
Vue.use(SocialSharing);
Vue.use(lineClamp, { importCss: true });
axios.defaults.baseURL = process.env.VUE_APP_API;
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (!app) {
    Vue.config.devtools = process.env.NODE_ENV === "development";
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App),
      created() {
        store.dispatch("setUser", firebaseUser);
      }
    }).$mount("#app");
  }
});
