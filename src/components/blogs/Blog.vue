<template>
  <div class="blog__container">
    <div v-html="devMarkdown"></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import fm from 'front-matter'
import devJson from '../../data/dev/DevTo.json';

const md = new MarkdownIt();

export default {
  name: 'Blog',
  computed: {
    devMarkdown: function() {
      const markdownData = fm(devJson[this.$route.params.slug].body_markdown)
      return `<h1 class="blog__header">${markdownData.attributes.title}</h1>
      ${md.render(markdownData.body)}`
    },
  }
}
</script>


<style lang="scss">
h1 {
  font-size: 26px;
  letter-spacing: -0.572px;
}
.blog {
  &__container {
    display: block;
    width: 100%;
    max-width: 645px;
    margin: 0 auto;
  }
  &__header {
    font-size: 40px;
  }
}
</style>
