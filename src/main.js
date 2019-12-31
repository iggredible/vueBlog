import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import store from "./store";

import routes from "./routes";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter(routes);

router.beforeEach((to, from, next) => {
  // no need to load CK if we are in development. Only do this in production
  if (process.env.NODE_ENV === "production") {
    // select DOM element by src https://stackoverflow.com/questions/19252339/get-element-by-src-attribute-with-javascript-not-jquery
    const ckScript = document.querySelector("script[src*=convertkit]");
    const ckForm = document.querySelector("form");
    if ((ckForm || ckScript) && (to.name === "Blog" || to.name === "Blogs")) {
      next();
    }
    if (ckForm) document.body.removeChild(ckForm);
    if (ckScript) document.body.removeChild(ckScript);

    // want to embed ck only on Blog/ BLogs
    if (to.name === "Blog" || to.name === "Blogs") {
      let ckEmbed = document.createElement("script");
      ckEmbed.setAttribute(
        "src",
        "https://thoughtful-writer-9767.ck.page/714f9a79e6/index.js"
      );
      ckEmbed.setAttribute("data-uid", "714f9a79e6");
      ckEmbed.async = true;
      document.body.appendChild(ckEmbed);
    }
  }
  next();
});

const app = new Vue({
  render: h => h(App),
  store,
  router
});

app.$mount("#app");
