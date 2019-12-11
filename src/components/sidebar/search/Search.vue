<template>
  <div class="search">
    <div class="search__button">
      <img
        class="search__magnifying-light"
        src="../../../assets/images/search.svg"
        @click="toggleIsSearching"
      />
      <input
        class="search__input"
        maxlength="24"
        v-show="isSearching"
        @input="changeHandle"
        type="text"
        v-model="search"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      isSearching: false
    };
  },
  methods: {
    changeHandle() {
      const search = this.search.replace(/\s/g, "");
      this.$store.dispatch("setSearchData", search);
    },
    toggleIsSearching() {
      this.isSearching = !this.isSearching;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/colors.scss";

.search {
  &__button {
    height: 44px;
    width: 44px;
    top: 12px;
    right: 1.6%;
    position: fixed;
    cursor: pointer;
    border-radius: 50%;
    z-index: 5;
    background: $lm-bg-button;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: box-shadow 0.3s ease-in;
  }
  &__button:hover {
    box-shadow: 4px 4px 15px -7px $lm-shadow-button;
  }

  &__input {
    width: 200px;
    /* border-radius: 30px; */
    border: none;
    border-bottom: 3px solid $lm-bg-button-border;
    /* box-shadow: 4px 4px 15px -7px $lm-shadow-button; */
    padding: 13px 15px 13px 15px;
    /* padding: 13px 120px 13px 30px; */
    position: absolute;
    right: 50px;
    font-size: 16px;
    outline: none;
  }
  &__magnifying-light {
    height: 21px;
    width: 21px;
    z-index: 9;
  }
}
input:focus {
  outline: none;
}
</style>
