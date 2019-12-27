<template>
  <div v-if="!isHomePage" class="arrow__container">
    <div class="arrow__button-back" @click="goBack">
      <img
        v-if="!isDarkMode"
        src="../../../assets/images/back-button-light-mode.svg"
      />
      <img
        v-if="isDarkMode"
        src="../../../assets/images/back-button-dark-mode.svg"
      />
    </div>
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
    goBack() {
      return this.$router.go(-1);
    },
    goUp() {
      return window.scrollTo(0, 0);
    }
  }
};
</script>

<style lang="scss">
.arrow {
  &__container {
  }

  &__button-back {
    position: fixed;
    left: 1.3%;
    bottom: 12px;
  }

  &__button-up {
    position: fixed;
    left: 1.3%;
    bottom: 60px;
  }
  &__button {
    cursor: pointer;
  }
}
</style>
