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
      const devJsonCopy = state.devJson;
      const devJsonKeys = Object.keys(state.devJson);
      devJsonKeys.forEach(devJsonKey => {
        const devJsonCopyKeyPublishedAt = devJsonCopy[devJsonKey].published_at;
        devJsonCopy[
          devJsonKey
        ].published_at = devJsonCopyKeyPublishedAt.replace(/T.*/, "");
      });

      const dateSortFunc = (a, b) => {
        const aa = devJsonCopy[a].published_at.split("-").join(),
          bb = devJsonCopy[b].published_at.split("-").join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      };
      console.log("RAW:");
      console.log(Object.keys(state.devJson));
      const sortedKeys = devJsonKeys.sort(dateSortFunc).reverse();
      console.log("from store:");
      console.log(sortedKeys);
      return sortedKeys;
    }
  }
});
