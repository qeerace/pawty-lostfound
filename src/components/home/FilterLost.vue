<template>
  <v-app-bar bottom fixed>
    <v-toolbar-title class="overline yellow--text text--darken-3 font-weight-bold">Filter</v-toolbar-title>
    <v-container>
      <v-row justify="center" style="max-height:50px;">
        <!-- <v-col cols="12" sm="auto" class="d-flex justify-end max-h">
          <div class="grey--text text--darken-3 title max-h" style="margin-top:7px;">Filter:</div>
        </v-col>-->
        <v-col sm="3" cols="4" class="max-h">
          <v-select
            dense
            v-model="selectedType"
            :items="type"
            chips
            label="Post Type"
            multiple
            solo
            class="max-h"
          ></v-select>
        </v-col>
        <v-col sm="3" cols="4" class="max-h">
          <v-select
            dense
            class="max-h"
            v-model="selectedGender"
            :items="gender"
            chips
            label="Gender"
            multiple
            solo
          ></v-select>
        </v-col>
        <v-col sm="3" cols="4" class="max-h">
          <v-select
            dense
            class="max-h"
            v-model="selectedProvince"
            v-on:input="limiter"
            :items="province"
            label="Province"
            multiple
            solo
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index === 0">
                <span>{{ item }}</span>
              </v-chip>
              <span
                v-if="index === 1"
                class="grey--text caption"
              >(+{{ selectedProvince.length - 1 }} others)</span>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      chips: [],
      type: ["Lost", "Found"],
      gender: ["Male", "Female"],
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
      ]
    };
  },

  methods: {
    ...mapActions(["setFilter"]),
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    limiter(e) {
      if (e.length > 3) {
        alert("you can only select up to 3 province.");
        e.pop();
      }
    }
  },
  computed: {
    ...mapGetters(["getFilterType", "getFilterGender", "getFilterProvince"]),
    selectedType: {
      set(type) {
        this.setFilter([type, this.selectedGender, this.selectedProvince]);
      },
      get() {
        return this.getFilterType;
      }
    },
    selectedGender: {
      set(gender) {
        this.setFilter([this.selectedType, gender, this.selectedProvince]);
      },
      get() {
        return this.getFilterGender;
      }
    },
    selectedProvince: {
      set(province) {
        this.setFilter([this.selectedType, this.selectedGender, province]);
      },
      get() {
        return this.getFilterProvince;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.max-h {
  max-height: 50px;
}
</style>
