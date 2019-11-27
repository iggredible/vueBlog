import Vue from "vue";
import Vuex from "vuex";
import devJson from "../data/dev/DevTo.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    devJson: {}
  },
  mutations: {
    GET_DEV_JSON_DATA(state) {
      state.devJson = devJson;
    }
  },
  actions: {
    getDevJsonData({ commit }) {
      return commit("GET_DEV_JSON_DATA");
    }
  }
});
