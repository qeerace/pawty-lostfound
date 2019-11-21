<template>
  <div>
    <v-card>
      <v-responsive :aspect-ratio="16 / 9">
        <v-card-text>
          <v-container fill-height fluid grid-list-xl>
            <v-row justify="center" wrap>
              <v-col cols="12" md="8">
                <v-form
                  @submit.prevent="post()"
                  v-model="valid"
                  lazy-validation
                  id="report-form"
                  ref="report_form"
                  method="POST"
                  enctype="multipart/form-data"
                >
                  <v-container py-0>
                    <v-layout wrap>
                      <v-flex xs12 md12>
                        <v-icon color="blue-grey darken-3">mdi-cursor-default-click</v-icon>
                        <span
                          class="title text-left font-weight-regular blue-grey--text text--darken-3"
                        >Select your post type</span>
                      </v-flex>
                      <v-radio-group v-model="form.post_type" row>
                        <v-radio label="Lost pet" value="Lost" color="yellow darken-3"></v-radio>
                        <v-radio label="Found pet" value="Found" color="yellow darken-3"></v-radio>
                      </v-radio-group>
                      <v-flex xs12 md12>
                        <h1
                          class="headline text-center font-weight-bold blue-grey--text text--darken-3"
                        >Fill Information to Report A Pet</h1>
                      </v-flex>
                      <v-flex xs12 md12>
                        <v-text-field
                          label="Title *"
                          :rules="titleRules"
                          v-model="form.topic"
                          color="yellow darken-3"
                          required
                        />
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="Name" v-model="form.name" color="yellow darken-3" />
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="Phone No." v-model="form.tel" color="yellow darken-3" />
                      </v-flex>
                      <v-flex xs12 md4>
                        <v-text-field label="Email" v-model="form.email" color="yellow darken-3" />
                      </v-flex>
                      <v-flex xs12 md12>
                        <v-file-input
                          accept="image/png, image/jpeg, image/bmp"
                          prepend-icon="mdi-camera"
                          v-model="file"
                          label="Pet Image *"
                          color="yellow darken-3"
                          ref="pic_file"
                          :rules="[
                            v =>
                              (v && v.size < 2000000) ||
                              'Image size is required and must be less than 2 MB'
                          ]"
                          required
                        ></v-file-input>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-select
                          :items="type"
                          v-model="form.pet_type"
                          label="Pet Type *"
                          color="yellow darken-3"
                          :rules="[v => !!v || 'Pet type is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field
                          :disabled="form.pet_type != 'Others'"
                          v-model="form.pet_type_other"
                          color="yellow darken-3"
                        />
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field
                          label="Pet Breed"
                          v-model="form.breed"
                          color="yellow darken-3"
                        />
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field
                          label="Pet Color"
                          v-model="form.color"
                          color="yellow darken-3"
                        />
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-select
                          :items="items"
                          label="Pet Gender *"
                          v-model="form.gender"
                          color="yellow darken-3"
                          :rules="[v => !!v || 'Gender is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-select
                          :items="size"
                          item-text="txt"
                          item-value="val"
                          label="Pet Size *"
                          color="yellow darken-3"
                          v-model="form.size"
                          :rules="[v => !!v || 'Pet size is required']"
                          required
                        ></v-select>
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          label="Description"
                          v-model="form.description"
                          value
                          color="yellow darken-3"
                        />
                      </v-flex>
                      <v-flex xs12>
                        <v-textarea
                          label="Address"
                          v-model="form.address"
                          value
                          color="yellow darken-3"
                        />
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-select
                          :items="province"
                          label="Province *"
                          v-model="form.province"
                          :rules="[v => !!v || 'Province is required']"
                          required
                          color="yellow darken-3"
                        />
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="form.missing_found_date"
                              label="Date"
                              prepend-icon="mdi-calendar-range"
                              readonly
                              v-on="on"
                              color="yellow darken-3"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="menu2 = false"
                            color="yellow darken-3"
                          ></v-date-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12 text-xs-right>
                        <v-btn
                          :disabled="!valid"
                          class="mx-0 subtitle-2 font-italic font-weight-medium blue-grey--text text--darken-3"
                          color="yellow darken-3"
                          type="submit"
                          form="report-form"
                        >Post Now!</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-responsive>
    </v-card>
    <v-overlay :value="loading">
      <v-progress-circular
        v-if="loading"
        :size="70"
        :width="7"
        color="yellow darken-3"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <v-alert
      class="alert"
      :value="showAlertOk"
      type="success"
      dismissible
      transition="scroll-y-transition"
    >Upload Successfully !</v-alert>
    <v-alert
      class="alert"
      :value="showAlertErr"
      type="error"
      dismissible
      transition="scroll-y-transition"
    >Upload Failed !</v-alert>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    loading: false,
    showAlertOk: false,
    showAlertErr: false,

    items: ["Male", "Female"],
    type: ["Dog", "Cat", "Bird", "Others"],
    size: [
      { txt: "Small", val: "1" },
      { txt: "Medium", val: "2" },
      { txt: "Large", val: "3" }
    ],
    province: [
      "Bangkok",
      "Amnat Charoen",
      "Ang Thong",
      "Bueng Kan",
      "Buri Ram",
      "Chachoengsao",
      "Chai Nat",
      "Chaiyaphum",
      "Chanthaburi",
      "Chiang Mai",
      "Chiang Rai",
      "Chon Buri",
      "Chumphon",
      "Kalasin",
      "Kamphaeng Phet",
      "Kanchanaburi",
      "Khon Kaen",
      "Krabi",
      "Lampang",
      "Lamphun",
      "Loei",
      "Lop Buri",
      "Mae Hong Son",
      "Maha Sarakham",
      "Mukdahan",
      "Nakhon Nayok",
      "Nakhon Pathom",
      "Nakhon Phanom",
      "Nakhon Ratchasima",
      "Nakhon Sawan",
      "Nakhon Si Thammarat",
      "Nan",
      "Narathiwat",
      "Nong Bua Lam Phu",
      "Nong Khai",
      "Nonthaburi",
      "Pathum Thani",
      "Pattani",
      "Phang-nga",
      "Phatthalung",
      "Phayao",
      "Phetchabun",
      "Phetchaburi",
      "Phichit",
      "Phitsanulok",
      "Phrae",
      "Phra Nakhon Si Ayutthaya",
      "Phuket",
      "Prachin Buri",
      "Prachuap Khiri Khan",
      "Ranong",
      "Ratchaburi",
      "Rayong",
      "Roi Et",
      "Sa Kaeo",
      "Sakon Nakhon",
      "Samut Prakan",
      "Samut Sakhon",
      "Samut Songkhram",
      "Saraburi",
      "Satun",
      "Sing Buri",
      "Si Sa Ket",
      "Songkhla",
      "Sukhothai",
      "Suphan Buri",
      "Surat Thani",
      "Surin",
      "Tak",
      "Trang",
      "Trat",
      "Ubon Ratchathani",
      "Udon Thani",
      "Uthai Thani",
      "Uttaradit",
      "Yala",
      "Yasothon"
    ],
    idToken: "",
    file: null,
    valid: true,
    date: null,
    menu: false,
    modal: false,
    menu2: false,
    user: "",
    titleRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 100) || "Title must be less than 50 characters"
    ],
    form: {
      post_type: "Lost",
      name: "",
      pet_type: "",
      pet_type_other: "Others",
      email: "",
      tel: "",
      social_account: "",
      topic: "",
      description: "",
      size: "",
      gender: "",
      breed: "",
      color: "",
      address: "",
      province: "",
      missing_found_date: ""
    }
  }),
  methods: {
    async post() {
      if (this.$refs.report_form.validate()) {
        this.loading = true;
        this.snackbar = true;
        let formData = new FormData();
        for (let key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            if (key == "pet_type" || key == "pet_type_other") {
              if (key == "pet_type") {
                this.form[key] == "Others"
                  ? formData.append(key, this.form.pet_type_other)
                  : formData.append(key, this.form[key]);
              }
            } else {
              formData.append(key, this.form[key]);
            }
          }
        }
        formData.append("pic", this.file, this.file.name);

        let config = {
          headers: {
            Authorization: "Bearer " + this.idToken,
            "Access-Control-Allow-Origin": "*"
          }
        };
        // for (var pair of formData.entries()) {
        //   console.log(pair[0] + ", " + pair[1]);
        // }
        await axios
          .post("/add-pets", formData, config)
          .then(() => {
            this.showAlertOk = true;
            this.clearForm();
            this.$refs.report_form.resetValidation();
            setTimeout(() => this.$router.push({ path: "/" }), 3000);
          })
          .catch(err => {
            this.showAlertErr = true;
            console.log(err);
          });
        this.loading = false;
        // console.log(formData);
        // for (var value of formData.values()) {
        //   console.log(value);
        // }
      }
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    clearForm() {
      this.form = {
        post_type: "Lost",
        name: "",
        pet_type: "",
        pet_type_other: "Others",
        email: "",
        tel: "",
        social_account: "",
        topic: "",
        description: "",
        size: "",
        gender: "",
        breed: "",
        color: "",
        address: "",
        province: "",
        missing_found_date: ""
      };
      this.file = null;
    }
  },
  watch: {
    date() {
      this.form.missing_found_date = this.formatDate(this.date);
    }
  },
  mounted() {
    this.date = new Date().toISOString().substr(0, 10);
    this.user = this.$store.getters.getUser;
    this.user.getIdToken().then(t => (this.idToken = t));
  },
  computed: {
    ...mapGetters(["getUser"])
  }
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  width: 100%;
  top: 60px;
  left: 0px;
}
</style>
