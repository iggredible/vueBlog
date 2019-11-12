<template>
  <div class="nav">
    <router-link class="nav__item" to="/blogs">Blogs</router-link>
  </div>
</template>

<script>
export default {};
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
