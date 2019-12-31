<template>
  <div class="nav">
    <div class="nav__main">
      <router-link class="nav__main-item" to="/">
        <h2 class="nav__header">irian.to</h2>
      </router-link>
    </div>

    <div class="nav__links">
      <router-link class="nav__links-item" to="/blogs">
        Blogs
      </router-link>

      <router-link class="nav__links-item" to="/about">
        About
      </router-link>

      <router-link class="nav__links-item" to="/vim">
        Vim
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/assets/styles/colors.scss";
.nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__main {
    display: inline-block;
    margin-left: 1rem;
  }

  &__links {
    display: inline-block;
    margin-right: 1rem;
    @media only screen and (max-width: 577px) {
      margin-right: 0.5rem;
    }
  }

  &__main-item {
    text-decoration: none;
    margin: 0.5rem 0;
  }

  &__links-item {
    text-decoration: none;
    margin: 0.5rem 1rem;
    @media only screen and (max-width: 577px) {
      margin: 0.5rem 0.25rem;
    }
    font-size: 1.25rem;
    font-weight: 500;
    position: relative;

    &:before {
      content: "";
      background: $nm-nav-underline;
      position: absolute;
      width: 100%;
      height: 2px;
      bottom: 0;
      left: 0;
      -webkit-transform: scaleX(0);
      transform: scaleX(0);
      -webkit-transition: all 0.3s ease-in-out 0s;
      transition: all 0.3s ease-in-out 0s;
    }

    &:hover:before {
      visibility: visible;
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }

  &__header {
    font-weight: 900;
    font-size: 60px;
    margin: 0;
  }
}
</style>
