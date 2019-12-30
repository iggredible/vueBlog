<template>
  <div v-if="!isHomePage" class="arrow__container">
    <div class="arrow__button-up" @click="goUp">
      <img
        v-if="!isDarkMode"
        src="../../../assets/images/up-button-light-mode.svg"
      />
      <img
        v-if="isDarkMode"
        src="../../../assets/images/up-button-dark-mode.svg"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isHomePage() {
      const path = this.$route.path;
      if (path === "/" || path === "/blogs") {
        return true;
      }
      return false;
    },
    isDarkMode() {
      if (this.$store.state.mode === "DARK") {
        return true;
      }
      return false;
    }
  },
  methods: {
    goUp() {
      return window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss">
.arrow {
  &__button-up {
    position: fixed;
    left: 1.3%;
    bottom: 20px;
    cursor: pointer;
  }
}
</style>
