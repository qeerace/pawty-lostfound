<template>
  <div>
    <v-img dark height="470" src="../assets/dog.jpg">
    <!-- <v-card-title xs12 md4>text</v-card-title> -->
    </v-img>
    <Cover />
    
    <FilterLost />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Cover from "@/components/home/Cover.vue";
import FilterLost from "@/components/home/FilterLost.vue";

export default {
  name: "home",
  components: {
    // HelloWorld,
    Cover,
    FilterLost
  }
};
</script>
