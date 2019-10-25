<template>
  <div>
    <h1>Blogs</h1>
    <p>Dolor accusantium officiis fugiat delectus voluptatem. Obcaecati doloribus autem nulla consequatur at esse. Consequatur porro repellat sequi cumque voluptatibus, sed. Inventore ea perferendis cupiditate omnis quod Magnam tenetur ipsum sequi.</p>

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
