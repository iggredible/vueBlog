<template>
  <div>
    <!-- <div>{{testStr}}</div> -->
    <!-- <span v&#45;html="testStr"></span> -->
    <!-- <div v&#45;html="renderedContent"></div> -->
    <div>Hello {{$route.params.slug}}</div>
    <div v-html="devMarkdown"></div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import devJson from '../../data/dev/DevTo.json';
const md = new MarkdownIt();

export default {
  name: 'Blog',
  computed: {
    devMarkdown: function() {
      return md.render(devJson[this.$route.params.slug].body_markdown)
    }
  }
}
</script>

