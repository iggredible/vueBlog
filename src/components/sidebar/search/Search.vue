<template>
  <div class="search">
    <div class="search__button" :class="{ dark: mode === 'DARK' }">
      <img
        v-if="mode === 'LIGHT'"
        class="search__magnifying-light"
        src="../../../assets/images/search.svg"
        @click="toggleIsSearching"
      />
      <img
        v-if="mode === 'DARK'"
        class="search__magnifying-dark"
        src="../../../assets/images/search-dark.svg"
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
    {{ mode }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      isSearching: false,
      mode: ""
    };
  },
  created() {
    const currentMode = this.$store.getters.getModeState;
    this.mode = currentMode;
    this.$store.watch(
      state => state.mode,
      newVal => {
        this.mode = newVal;
      }
    );
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
  z-index: 2;
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
    transition: all 0.3s ease-in;
  }
  &__button:hover {
    box-shadow: 4px 4px 15px -7px $lm-shadow-button;
  }

  &__button.dark {
    background: $dm-bg-button;
    transition: all 0.2s ease-in 0.14s;
  }
  &__button.dark:hover {
    box-shadow: 4px 4px 15px -7px $dm-shadow-button;
  }

  &__input {
    width: 200px;
    border: none;
    border-bottom: 3px solid $lm-bg-button-border;
    padding: 13px 15px 13px 15px;
    position: absolute;
    right: 50px;
    font-size: 16px;
    outline: none;
  }
  &__magnifying-light,
  &__magnifying-dark {
    height: 21px;
    width: 21px;
    z-index: 9;
  }
}

input:focus {
  outline: none;
}
.dark input[type="text"] {
  background: $dm-bg-page;
}
</style>
