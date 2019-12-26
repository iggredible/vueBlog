<template>
  <div class="blog__container">
    <div v-html="devMarkdown"></div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import fm from "front-matter";

const md = new MarkdownIt();

export default {
  name: "Blog",
  data() {
    return {
      devJson: {}
    };
  },
  created() {
    this.devJson = this.$store.state.devJson;
  },
  computed: {
    devMarkdown: function() {
      const markdownData = fm(
        this.devJson[this.$route.params.slug].body_markdown
      );

      return `
        <h1 class="blog__header">${markdownData.attributes.title}</h1>
        ${md.render(markdownData.body)}
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
