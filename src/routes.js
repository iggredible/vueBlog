import Blog from "./components/blogs/Blog.vue";
import Blogs from "./components/blogs/Blogs.vue";
import About from "./components/about/About.vue";
import Vim from "./components/vim/Vim.vue";
import VimCheatsheet from "./components/vim/Cheatsheet.vue";
import VimResources from "./components/vim/Resources.vue";

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
    }
    // {
    //   path: "/vim",
    //   component: Vim,
    //   name: "Vim",
    //   children: [
    //     {
    //       path: "cheatsheet",
    //       name: "VimCheatsheet",
    //       component: VimCheatsheet
    //     },
    //     {
    //       path: "resources",
    //       name: "VimResources",
    //       component: VimResources
    //     }
    //   ]
    // }
  ]
};

export default routes;
