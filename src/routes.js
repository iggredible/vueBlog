import Blog from "./components/blogs/Blog.vue";
import Blogs from "./components/blogs/Blogs.vue";
import About from "./components/about/About.vue";
import Vim from "./components/vim/Vim.vue";

const routes = {
  mode: "history",
  routes: [
    {
      path: "/blogs",
      component: Blogs,
      name: "Blogs",
      alias: "/"
    },
    {
      path: "/blog/:slug",
      component: Blog,
      name: "Blog"
    },
    {
      path: "/about",
      component: About,
      name: "About"
    },
    {
      path: "/vim",
      component: Vim,
      name: "Vim"
    }
  ]
};

export default routes;
