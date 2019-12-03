<template>
  <div class="mode-toggle">
    <Lightbulb />
  </div>
</template>

<script>
import Lightbulb from "./Lightbulb.vue";
export default {
  components: {
    Lightbulb
  }
};
</script>

<style lang="scss">
.mode-toggle {
  position: fixed;
  top: 1rem;
  left: 1rem;
}
</style>
