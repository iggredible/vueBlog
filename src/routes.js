import About from './components/About.vue';
import Blog from './components/blogs/Blog.vue';
import Blogs from './components/blogs/Blogs.vue';

const routes =   {
  mode: 'history',
  routes: [
    {
      path: '/blogs',
      component: Blogs,
      name: 'Blogs'
    },
    {
      path: '/about',
      component: About,
      name: 'About'
    },
    {
      path: '/blog/:slug',
      component: Blog,
      name: 'Blog'
    }
  ]
}

export default routes;
