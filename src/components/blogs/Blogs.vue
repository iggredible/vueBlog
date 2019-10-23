<template>
  <div>
    <h1>Blogs</h1>
    <p>Dolor accusantium officiis fugiat delectus voluptatem. Obcaecati doloribus autem nulla consequatur at esse. Consequatur porro repellat sequi cumque voluptatibus, sed. Inventore ea perferendis cupiditate omnis quod Magnam tenetur ipsum sequi.</p>

    <Blog />
    {{devJson}}
  </div>
</template>

<script>
import Blog from './Blog.vue'
import devJson from '../../data/dev/DevTo.json';

export default {
  components: {
    Blog
  },
  data() {
    return {
      devJson
    }
  }
}
</script>

<style>

</style>
