<template>
  <div class="blogs__container">
    <ul class="blogs__list">
      <li
        class="blogs__feed"
        v-for="article in blogsArrFilterable"
        v-bind:key="article"
      >
        <div class="blogs__feed-meta-container">
          <time class="blogs__time" v-if="blogsData">{{
            readableDate(extractDateStrFromDevData(blogsData[article]))
          }}</time>
        </div>
        <h2 class="blogs__feed-title">
          <router-link
            v-if="blogsData"
            class="blogs__feed-link"
            :to="`/blog/${article}`"
          >
            {{ blogsData[article].title }}
            <p class="blogs__feed-description">
              {{ blogsData[article].description }}
            </p>
          </router-link>
        </h2>
      </li>
    </ul>
  </div>
</template>

<script>
import fuzzysort from "fuzzysort";
export default {
  beforeCreate() {
    this.$store.dispatch("setupBlogData");
  },
  computed: {
    blogsData() {
      return this.$store.state.blogsJson;
    },
    blogsArrFilterable() {
      const search = this.$store.state.search;
      const blogsArr = this.$store.state.blogsArr;
      const result = fuzzysort.go(search, this.blogsArr);
      const filteredDevArr = result.map(el => el.target);
      if (search === "") {
        return blogsArr;
      } else {
        return filteredDevArr;
      }
    }
  },
  methods: {
    extractDateStrFromDevData(devData) {
      if (devData) {
        return devData.published_at;
      }
      return false;
    },
    readableDate(dateStr) {
      if (dateStr) {
        return new Date(Date.parse(dateStr)).toDateString();
      }
      return "";
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/colors.scss";

.blogs {
  &__container {
    max-width: 645px;
    margin: 0 auto;
  }
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
    margin-bottom: 0;
  }
  &__feed-description {
    margin-top: -8px;
    margin-bottom: 0;
    font-weight: 400;
    font-size: 20px;
    &:hover {
      color: $lm-font-hover;
    }
  }
  &__feed-link {
    text-decoration: none;
    &:hover {
      color: $lm-font-headers;
    }
  }
  &__time {
    padding: 2px;
    display: inline-block;
  }
}
</style>
