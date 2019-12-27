<template>
  <div id="app" class="">
    <Lightbulb />
    <Arrow />
    <Nav />
    <div class="app__container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "./components/nav/Nav.vue";
import Lightbulb from "@/components/sidebar/darkmode/Lightbulb.vue";
import Arrow from "@/components/sidebar/navigation/Arrow.vue";

export default {
  name: "App",
  components: {
    Nav,
    Lightbulb,
    Arrow
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
    padding: 1rem;
    margin: 0 auto;
    max-width: 645px;
    min-height: 100vh;

    /* medium mobile */
    @media only screen and (max-width: 768px) {
      padding-right: 5rem;
      padding-left: 2.5rem;
    }
    /* small mobile (per bootstrap: 576px) */
    @media only screen and (max-width: 577px) {
      max-width: 580px;
      margin-right: 2.5rem; /* avoid overlap with bulb button */
      margin-left: 1.5rem;
      padding-right: 1rem;
      padding-left: 1rem;
    }
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

ul {
  padding-left: 24px;
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

pre {
  width: 100%;
  background: $lm-code-bg;
  padding: 2rem 0.15rem;
  overflow: scroll;
  border-radius: 6px;
}

#app.dark {
  a {
    color: $dm-font-link;
    &:hover {
      color: $dm-font-hover;
    }
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
