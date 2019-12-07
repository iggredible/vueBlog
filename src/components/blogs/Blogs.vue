<template>
  <div class="blogs__container">
    <ul class="blogs__list">
      <li
        class="blogs__feed"
        v-for="article in devJsonArr"
        v-bind:key="article"
      >
        <div class="blogs__feed-meta-container">
          <time class="blogs__time" v-if="devJson">{{
            readableDate(devJson[article].published_at)
          }}</time>
        </div>
        <h2 class="blogs__feed-title">
          <router-link
            v-if="devJson"
            class="blogs__feed-link"
            :to="`/blog/${article}`"
          >
            {{ devJson[article].title }}
          </router-link>
        </h2>
      </li>
    </ul>
  </div>
</template>

<script>
import fuzzysort from "fuzzysort";
export default {
  data() {
    return {
      devJson: {}
    };
  },
  created() {
    this.devJson = this.$store.state.devJson;
    this.$store.dispatch("createDevJsonArr");
  },
  computed: {
    devJsonArr() {
      const search = this.$store.state.search;
      const devJsonArr = this.$store.state.devJsonArr;
      const result = fuzzysort.go(search, devJsonArr);
      const filteredDevArr = result.map(el => el.target);
      if (search === "") {
        return devJsonArr;
      } else {
        return filteredDevArr;
      }
    }
  },
  methods: {
    readableDate(dateStr) {
      return new Date(Date.parse(dateStr)).toDateString();
    }
  }
};
</script>

<style lang="scss">
.blogs {
  &__list {
    padding-left: 0;
  }
  &__feed {
    list-style-type: none;
    margin-bottom: 48px;
  }
  &__feed-title {
    line-height: 40px;
    margin-top: 0;
  }
  &__feed-link {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  &__time {
    padding: 2px;
    display: inline-block;
  }
}
</style>
