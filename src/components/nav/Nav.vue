<template>
  <div class="nav">
    <router-link class="nav__item" to="/">
      <h2 class="nav__header">irian.to</h2>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  &__item {
    text-decoration: none;
    margin: 0.5rem 0;
  }

  &__header {
    font-weight: 900;
    font-size: 60px;
    margin: 0;
  }
}
</style>
