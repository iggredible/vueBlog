<template>
  <div class="blogs__container">
    <ul class="blogs__list">
      <li
        class="blogs__feed"
        v-for="article in sortedByDateDevJsonKeys"
        v-bind:key="article"
      >
        <div class="blogs__feed-meta-container">
          <time class="blogs__time">{{
            readableDate(devJson[article].published_at)
          }}</time>
        </div>
        <h2 class="blogs__feed-title">
          <router-link class="blogs__feed-link" :to="`/blog/${article}`">
            {{ devJson[article].title }}
          </router-link>
        </h2>
      </li>
    </ul>
  </div>
</template>

<script>
import devJson from "../../data/dev/DevTo.json";

export default {
  data() {
    return {
      devJson
    };
  },
  computed: {
    sortedByDateDevJsonKeys() {
      const devJsonCopy = devJson;
      const devJsonKeys = Object.keys(devJsonCopy);
      devJsonKeys.forEach(devJsonKey => {
        const devJsonCopyKeyPublishedAt = devJsonCopy[devJsonKey].published_at;
        devJsonCopy[
          devJsonKey
        ].published_at = devJsonCopyKeyPublishedAt.replace(/T.*/, "");
      });

      // this function could be rfactored so it does not depend on devJsonCopy
      const dateSortFunc = (a, b) => {
        const aa = devJsonCopy[a].published_at.split("-").join(),
          bb = devJsonCopy[b].published_at.split("-").join();
        return aa < bb ? -1 : aa > bb ? 1 : 0;
      };
      const sortedKeys = devJsonKeys.sort(dateSortFunc).reverse();
      // const sortedKeys = sortDevJsonKeys(devJsonKeys)(dateSortFunc).reverse();
      return sortedKeys;
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
