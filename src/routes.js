import About from './components/About.vue';
import Blogs from './components/blogs/Blogs.vue';

const routes =   {
  mode: 'history',
  routes: [
    {path: '/blogs', component: Blogs},
    {path: '/about', component: About}
  ]
}

export default routes;
