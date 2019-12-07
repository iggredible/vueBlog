<template>
  <div>
    <input type="text" placeholder="Search article" v-model="search" />
    {{ filteredArr }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      devArr: []
    };
  },
  created() {
    this.devArr = this.$store.getters.devJsonArr;
  },
  computed: {
    filteredArr() {
      console.log("HEY FILTERED ARR");
      const filteredArr = this.devArr.filter(title => {
        return title.toLowerCase().includes(this.search.toLowerCase());
      });
      console.log(filteredArr);
      return filteredArr;
    }
  }
};
</script>

<style></style>
