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
import gsap from "gsap";
import $ from "jquery";

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
      const searchInput = $(".search__input");
      this.isSearching = !this.isSearching;
      if (this.isSearching) {
        // expands width
        gsap.to(searchInput, {
          width: 200,
          paddingRight: 120,
          paddingLeft: 30,
          duration: 0.3,
          right: 0,
          ease: "Power4.easeIn"
        });
      } else {
        console.log("CLOSING");
        gsap.to(searchInput, {
          width: 0,
          paddingRight: 0,
          paddingLeft: 0,
          right: 13,
          duration: 1
        });
      }
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
    width: 24px;
    border-radius: 30px;
    border: none;
    box-shadow: 4px 4px 15px -7px $lm-shadow-button;
    padding: 13px 0px 13px 0px;
    /* padding: 13px 120px 13px 30px; */
    position: absolute;
    right: 13px;
    font-size: 16px;
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
