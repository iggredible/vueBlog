<template>
  <div id="app" class="">
    <SideBar />
    <div class="app__container">
      <Nav />
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "./components/nav/Nav.vue";
import SideBar from "@/components/sidebar/Sidebar";

export default {
  name: "App",
  components: {
    Nav,
    SideBar
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/colors.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  &__container {
    padding: 2rem 1rem;
    max-width: 645px;
    margin: 0 auto;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: $lm-font-headers;
}

div,
span,
input,
p {
  color: $lm-font-text;
}

a {
  color: $lm-font-link;
}
pre code {
  color: $lm-font-precode;
}

#app.dark {
  a {
    color: $dm-font-link;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: $dm-font-headers;
  }

  div,
  span,
  input,
  p {
    color: $dm-font-text;
  }

  pre code {
    color: $dm-font-precode;
  }
  background: $dm-bg-page;
}
</style>
