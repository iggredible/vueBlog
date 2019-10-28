<template>
  <div class="blogs__container">
    <h1 class="blogs__header">All Blogs</h1>
    <ul class="blogs__list">
      <li class="blogs__feed" v-for="article in devJsonKeys" v-bind:key="article">
        <div class="blogs__feed-meta-container">
          <time>{{devJson[article].published_at}}</time>
          <span>{{devJson[article].tag_list}}</span>
        </div>
        <router-link class="blogs__feed-link" :to="`/blog/${article}`">
          <h2 class="blogs__feed-title">{{devJson[article].title}}</h2>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import devJson from '../../data/dev/DevTo.json';

export default {
  data() {
    return {
      devJson
    }
  },
  computed: {
    devJsonKeys() {
      return Object.keys(devJson)
    }
  }
}
</script>

<style lang="scss">
.blogs {
  &__feed {
    list-style-type: none;
    margin-bottom: 24px;
  }
  &__feed-title {
    font-size: 26px;
    line-height: 40px;
    margin-top: 0;
  }
  &__feed-link {
    text-decoration: none;
    color: #2c3e50;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
