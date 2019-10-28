<template>
  <div>
    <h1>All Blogs</h1>
    <ul>
      <li v-for="article in devJsonKeys" v-bind:key="article">
        <router-link :to="`/blog/${article}`">{{devJson[article].title}}</router-link>
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

<style>

</style>
