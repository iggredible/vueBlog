<template>
  <div>
    <input
      @input="changeHandle"
      type="text"
      placeholder="Search article"
      v-model="search"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  mounted() {},
  methods: {
    changeHandle() {
      const search = this.search.replace(/\s/g, "");
      this.$store.dispatch("setSearchData", search);
    }
  }
};
</script>

<style></style>
