<template>
  <div class="about__container">
    <h1 class="about__header">
      About Me
    </h1>

    <p class="about__content">
      Hello there! My name's Igor Irianto. I am a developer and a blogger living
      in Dallas.
    </p>
    <p class="about__content">
      You can find me on
      <a href="https://twitter.com/iggredible">twitter</a> 😁.
    </p>
    <p class="about__content">
      <b>More to come...</b>
    </p>
    <div class="about__image-container">
      <img
        src="../../assets/images/profile/iggy.png"
        class="about__profile-photo"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.about {
  &__content {
  }
  &__profile-photo {
    width: 300px;
    height: auto;
  }
  &__image-container {
    text-align: center;
  }
}
</style>
