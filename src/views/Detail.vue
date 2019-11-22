<template>
  <div class="comments">
    <v-container>
      <v-row justify="center">
        <v-col sm="10" cols="12">
          <v-card>
            <v-responsive :aspect-ratio="16 / 9">
              <v-card-title>
                <v-btn class="ma-2" text icon color="blue lighten-2" to="/">
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                {{petDetail.post_type}} {{petDetail.color}} {{petDetail.pet_type}} ({{petDetail.gender}})
              </v-card-title>
              <v-img :src="petDetail.pic_url" aspect-ratio="2" class="white--text align-end"></v-img>
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-title
                    class="title font-weight-black blue-grey--text text--darken-3"
                  >Contact Thread Owner</v-card-title>
                  <v-card-text pb-0 class="blue-grey--text text--darken-3">
                    <div>
                      <v-icon small color="yellow darken-3">mdi-account-card-details-outline</v-icon>
                      Name: {{ petDetail.name }}
                    </div>
                    <div>
                      <v-icon small color="yellow darken-3">mdi-email-newsletter</v-icon>
                      E-mail: {{ petDetail.email }}
                    </div>
                    <div>
                      <v-icon small color="yellow darken-3">mdi-phone</v-icon>
                      Tel: {{ petDetail.tel }}
                    </div>
                    <div>
                      <v-icon small color="yellow darken-3">mdi-forum</v-icon>
                      Social Account: {{ petDetail.social_account }}
                    </div>
                  </v-card-text>
                  <div class="d-flex inline-block">
                    <v-card-actions style="padding-left:17px; padding-right:4px;"></v-card-actions>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card-title
                    class="title font-weight-black blue-grey--text text--darken-3 text-uppercase"
                  >{{petDetail.topic}}</v-card-title>
                  <v-card-subtitle pb-0>
                    <div>
                      <v-icon small color="yellow darken-3">mdi-map-marker</v-icon>
                      {{ petDetail.province }}
                    </div>
                    <div>
                      Missing/Found Date:
                      {{ petDetail.missing_found_date }}
                    </div>
                    <div>
                      Pet Breed:
                      {{ petDetail.breed }}
                    </div>
                    <div>
                      Pet Size:
                      {{ petDetail.size }} 
                    </div>
                  </v-card-subtitle>
                  <v-card-text pb-0 class="blue-grey--text text--darken-3">
                    <div>Description :</div>
                    <div>{{ petDetail.description }}</div>
                  </v-card-text>
                </v-col>
              </v-row>
              <v-card-actions v-if="isLogin">
                <v-card-subtitle>Already Found / Don't want to see this post anymore?</v-card-subtitle>
                <v-btn
                  
                  class="mx-0 subtitle-2 font-italic font-weight-medium amber--text text--lighten-5"
                  color="red darken-3"
                  @click="deletePost()"
                >Mark post as found</v-btn>
              </v-card-actions>
              <vue-disqus
                class="disqus"
                shortname="pawty-cie"
                :identifier="this.$route.params.id"
                :url="this.url"
              ></vue-disqus>
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-overlay :value="isFound">
      <div
        class="back-to-home display-1 font-weight-bold yellow--text text--darken-2"
        @click="$router.push({ name: 'home' })"
      >
        <v-icon color="yellow darken-2">mdi-arrow-left-thick</v-icon>
        <span>Back</span>
      </div>
      <p class="display-4 font-weight-bold found yellow--text text--darken-2">FOUND</p>
    </v-overlay>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Detail",
  async mounted() {
    let user = this.$store.getters.getUser;
    let config = {};
    if (user != null) {
      let idToken = "";
      await user.getIdToken().then(t => (idToken = t));
      config = {
        headers: {
          Authorization: "Bearer " + idToken,
          "Access-Control-Allow-Origin": "*"
        }
      };
    }
    axios
      .get(`/pet-detail/${this.$route.params.id}`, config)
      .then(response => {
        // console.log(this.$route.params.id);
        this.petDetail = response.data;
        if (response.data.is_owner === true) {
          this.isLogin = true;
        }
        if (response.data.is_found === true) {
          this.isFound = true;
        }
      })
      .catch(() => {});
  },
  data() {
    return {
      url: window.location.href,
      petDetail: {},
      isLogin: false,
      isFound: false
    };
  },
  methods: {
    async deletePost() {
      let idToken = "";
      let user = this.$store.getters.getUser;
      if (user == null) {
        return;
      }
      await user.getIdToken().then(t => (idToken = t));
      let config = {
        headers: {
          Authorization: "Bearer " + idToken,
          "Access-Control-Allow-Origin": "*"
        }
      };
      axios
        .post(`/found-pet/${this.$route.params.id}`, {}, config)
        .then(() => {
          location.reload();
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.disqus {
  padding: 16px;
}
.found {
  border: 5px double #f9a825;
}
.back-to-home {
  cursor: pointer;
  position: fixed;
  left: 20px;
  top: 80px;
}
</style>
