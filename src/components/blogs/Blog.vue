<template>
  <div class="blog__container">
    <div v-html="blogMarkdown"></div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import fm from "front-matter";

const md = new MarkdownIt();

export default {
  name: "Blog",
  beforeCreate() {
    this.$store.dispatch("setupBlogData");
  },
  computed: {
    blogMarkdown: function() {
      const blogsJson = this.$store.state.blogsJson;
      const slug = this.$route.params.slug;
      const title = blogsJson[slug].title;
      const body = fm(blogsJson[slug].markdown_body).body;
      return `
        <h1 class="blog__header">${title}</h1>
        ${md.render(body)}
      `;
    }
  }
};
</script>
<style lang="scss">
.blog {
  &__container {
    img {
      height: auto;
      position: relative;
      display: block;
      margin: auto;
    }
  }

  &__header {
    font-size: 3rem;
  }
}
</style>
