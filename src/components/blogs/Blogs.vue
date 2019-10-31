<template>
  <div class="blogs__container">
    <h1 class="blogs__header">All Blogs</h1>
    <hr />
    <ul class="blogs__list">
      <li class="blogs__feed" v-for="article in devJsonKeys" v-bind:key="article">
        <div class="blogs__feed-meta-container">
          <time class="blogs__time">{{readableDate(devJson[article].published_at)}}</time> |
          <span v-for="tag in devJson[article].tag_list" v-bind:key="tag">
            <span class="blogs__tag">{{tag}}</span>
          </span>
        </div>
        <h2 class="blogs__feed-title">
          <router-link class="blogs__feed-link" :to="`/blog/${article}`">
            {{devJson[article].title}}
          </router-link>
        </h2>
      </li>
    </ul>
  </div>
</template>

<script>
import devJson from '../../data/dev/DevTo.json';

const readableDate = (dateStr) => new Date(Date.parse(dateStr));

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
  },
  methods: {
    readableDate(dateStr) {
      return new Date(Date.parse(dateStr)).toDateString()
    }
  }
}
</script>

<style lang="scss">
.blogs {
  &__container {
    margin: 0 20px;
  }
  &__feed {
    list-style-type: none;
    margin-bottom: 48px;
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
  &__tag {
    margin: 0 4px;
    padding: 2px;
    font-weight: 500;
    color: #e58e26;
    display: inline-block;
    background: #f5f5f5;
  }
  &__time {
    padding: 2px;
    display: inline-block;
  }
  &__list {
    padding: 0;
  }
}
</style>
