import Vue from "vue";
import Vuex from "vuex";
import devJson from "../data/dev/DevTo.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    devJson: devJson
  },
  getters: {
    devJsonArr(state) {
      const devJson = state.devJson;
      const devJsonKeys = Object.keys(devJson);

      devJsonKeys.forEach(devJsonKey => {
        const devJsonKeyPublishedAt = devJson[devJsonKey].published_at;
        devJson[devJsonKey].published_at = devJsonKeyPublishedAt.replace(
          /T.*/,
          ""
        );
      });

      const dateSortFunc = (a, b) => {
        const aa = devJson[a].published_at.split("-").join(),
          bb = devJson[b].published_at.split("-").join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      };
      const sortedKeys = devJsonKeys.sort(dateSortFunc).reverse();
      return sortedKeys;
    }
  }
});
