<template>
  <div id="app">
    <div class="app__container">
      <Nav />
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "./components/nav/Nav.vue";

export default {
  name: "App",
  components: {
    Nav
  }
};
</script>

<style lang="scss">
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
  color: #2c3e50;
}

div,
span,
p {
  color: #222222;
}

a {
  color: #0074d9;
}
</style>
