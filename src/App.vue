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
  color: #2c3e50;
}

.app {
  &__container {
    padding: 2rem 1rem;
    max-width: 645px;
    margin: 0 auto;
  }
}
</style>
