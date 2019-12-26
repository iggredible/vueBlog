import Vue from "vue";
import Vuex from "vuex";
import originalJson from "../data/original/Original.json";
import devJson from "../data/dev/DevTo.json";

Vue.use(Vuex);
const defaultMode = "LIGHT";

export default new Vuex.Store({
  state: {
    devJson: devJson,
    devJsonArr: [],
    originalJson: originalJson,
    blogsArr: [],
    blogsJson: {},
    search: "",
    mode: defaultMode
  },
  mutations: {
    SET_MODE(state, mode) {
      state.mode = mode;
    },
    SET_SEARCH_DATA(state, search) {
      state.search = search;
    },
    SETUP_BLOG_DATA(state) {
      const devJson = state.devJson;
      const originalJson = state.originalJson;

      const normalizeDev = (devJson) => {
        const resultObj = {};
        const devJsonKeys = Object.keys(devJson);
        devJsonKeys.forEach(key => {
          resultObj[key] = {
            title: devJson[key].title,
            published_at: devJson[key].published_at,
            description: devJson[key].description,
            body: devJson[key].body_markdown,
            blog_type: 'DEV'
          }
        })
        /* somehow key 'id' is a duplicate of earliest dev.to data */
        if(resultObj['id']){
          delete resultObj['id']
        }
        return resultObj
      }

      const normalizeOriginal = (originalJson) => {
        const resultObj = {};
        const originalJsonKeys = Object.keys(originalJson);
        originalJsonKeys.forEach(key => {
          resultObj[key] = {
            title: originalJson[key].attributes.title,
            published_at: originalJson[key].attributes.published_at,
            description: originalJson[key].attributes.description,
            body: originalJson[key].body,
            blog_type: 'ORIGINAL'
          }
        })
        return resultObj
      }
      const normalizedDev = normalizeDev(devJson);
      const normalizedOriginal = normalizeOriginal(originalJson);

      const blogsMerger = (dev, original) => {
        const resultObj = {...dev, ...original}
        return resultObj;
      }
      const normalizedBlogs = blogsMerger(normalizedDev, normalizedOriginal)
      const normalizedBlogsKeys = Object.keys(normalizedBlogs);

      const dateSortFunc = (a, b) => {
        const aa = normalizedBlogs[a].published_at.split("-").join(),
          bb = normalizedBlogs[b].published_at.split("-").join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      };

      const sortedBlogsArr = normalizedBlogsKeys.sort(dateSortFunc).reverse();

      state.blogsJson = normalizedBlogs;
      state.blogsArr = sortedBlogsArr;
    }
  },
  actions: {
    setSearchData({ commit }, search) {
      commit("SET_SEARCH_DATA", search);
    },
    setupBlogData({ commit }) {
      commit("SETUP_BLOG_DATA");
    },
    setMode({ commit }, mode) {
      commit("SET_MODE", mode);
    }
  },
  getters: {
    getModeState: state => state.mode
  }
});
