<template>
  <div class="vim__container">
    <router-link class="vim__link-item" to="/vim/cheatsheet"
      >Cheatsheet</router-link
    >
    <router-link class="vim__link-item" to="/vim/resources"
      >Resources</router-link
    >
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.vim {
  &__container {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  &__link-item {
    margin: 0 1.5rem 0 0;
  }
}
</style>
