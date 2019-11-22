<template>
    <h1>test</h1>
</template>

<script>
import { mapGetters } from "vuex";
// import firebase from "firebase";
export default {
  data: () => ({
    user: this.$store.getters.getUser
  }),
  mounted(){
    // console.log(this.user);
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>
