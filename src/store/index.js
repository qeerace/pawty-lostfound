import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loginModal: false,
    filterType: [],
    filterGender: [],
    filterProvince: []
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoginModal(state, payload) {
      state.loginModal = payload;
    },
    setFilterType(state, payload) {
      state.filterType = payload;
    },
    setFilterGender(state, payload) {
      state.filterGender = payload;
    },
    setFilterProvince(state, payload) {
      state.filterProvince = payload;
    },
    removeUser(state) {
      state.user = null;
    }
  },
  actions: {
    setUser({ commit }, userObject) {
      commit("setUser", userObject);
    },
    setLoginModal({ commit }, val) {
      commit("setLoginModal", val);
    },
    setFilter({ commit }, [type, gender, province]) {
      commit("setFilterType", type);
      commit("setFilterGender", gender);
      commit("setFilterProvince", province);
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getLoginModal(state) {
      return state.loginModal;
    },
    getFilterType(state) {
      return state.filterType;
    },
    getFilterGender(state) {
      return state.filterGender;
    },
    getFilterProvince(state) {
      return state.filterProvince;
    }
  },
  modules: {}
});
