<template>
  <div class="nav">
    <router-link class="nav__item" to="/blogs">Blogs</router-link>
    <!-- <span @click="toggleMode"><img src="../../assets/lightbulb&#45;white.svg"></span> -->
  </div>
</template>

<script>
export default {
};
</script>

<style>
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
}

.nav__item {
  text-decoration: none;
  margin: 0.5rem 2rem;
}
</style>
