---
title: VUE: Setting up vuepress with tailwindcss
published: true
description: setup vuepress with tailwindcss
tags: vuepress, tailwindcss, blog, css
---


I have been looking for a simple Vue blog engine and decided to use [vuepress](https://vuepress.vuejs.org/). I also have been wanting to learn about [tailwindcss](https://tailwindcss.com/). Why not use them together so I can learn *both* Vue framework and tailwindcss? That way I can kill two birds with one stone _(or in Chuck Norris's world, kill two stones with one bird)_.

![chuck norris approves](https://media.giphy.com/media/SfCKK2pwXjIgo/giphy.gif)

There are several guides ([here](https://www.amie-chen.com/blog/20190211-build-a-site-with-vuepress-part2.html) and [here](https://dev.to/vuevixens/build-a-beautiful-website-with-vuepress-and-tailwindcss--3a03)) on vuepress + tailwindcss integration. They are very excellent guides - but it looks like these guides were written prior to tailwind v1.0.0 release and I could not get them to run ([major changes](https://tailwindcss.com/docs/upgrading-to-v1/) were implemented between v0.x to v1.0). 

I decided to write this article for users using recent tailwindcss v1.+ and vuepress v1.+ (_I am using vuepress v1.0.3 and tailwindcss v1.1.2 at the time of this writing)_.


**The repo for this article can be found [here](https://github.com/iggredible/vuepress-tailwindcss).**

# Setting up Vuepress

Ensure vuepress is installed in machine. It will help in the future to save it globally.

```
npm i -g vuepress
```

Create your directory. I called mine `tailwind-press`.

```
mkdir tailwind-press && cd $_
```

Start npm project. I used `-y` to skip questions.

```
npm init -y
```

Install vuepress dependency.

```
npm i --save vuepress
```

Per [vuepress site](https://vuepress.vuejs.org/guide/basic-config.html#config-file), it is recommended to due customization inside `/docs` folder with `/.vuepress` directory and `readme.md`, so let's do that.

``` 
mkdir -p docs/.vuepress
mkdir docs/blogs/
touch docs/readme.md docs
touch docs/blogs/blog1.md docs/blogs/blog2.md
```

Fill blogs/blog1.md, blogs/blog2.md, and readme.md with some content.

```
// readme.md
# tailwind-press
Hello!

// blogs/blog1.md
# Doc1
doc1 test

// blogs/blog2.md
# Doc2
doc2 test
```

Your project should look like this now:

```
.
├─ docs
│  ├─ readme.md
│  ├─ blogs
│  │  ├─ blog1.md
│  │  └─ blog2.md
│  └─ .vuepress
│     └─ config.js
└─ package.json
```

Test vuepress by running: 

```
vuepress dev docs
```

You should have a basic vuepress running at 8080. You can check out blog1 at http://localhost:8080/blogs/blog1.html.

Sweetness! Part one is done. Time to customize it by applying our own theme.

# Overwriting default theme

Add `config.js` inside `docs/.vuepress/` and put the following. This will add "blogs" nav with links to blog1 and blog2.

```
module.exports = {
  title: "Hello Tailwind-Press!",
  description: "Blog v0.0.1",
  themeConfig: {
    nav: [
      {
        text: "blogs",
        items: [
          { text: "blog1", link: "/blogs/blog1.md" },
          { text: "blog2", link: "/blogs/blog2.md" }
        ]
      }
    ]
  }
};
```

Next is an important part of vuepress custom theme: to overwrite vuepress's default theme, you need to add `/theme/Layout.vue` in `/.vuepress` directory. Vuepress will _automagically_ replace default theme to yours. Let's create `/theme/Layout.vue` inside `/.vuepress`. Your doc structure should look like the following:

```
.
├─ docs
│  ├─ readme.md
│  ├─ blogs
│  └─ .vuepress
│     └─ config.js
│     └─ theme
│        └─ Layout.vue
└─ package.json
```

Put a basic Vue boilerplate inside Layout.vue:

```
<template>
  <div>
    <h1>{{ $site.title }}</h1> 
    <div>Your blog goes here</div>
  </div>
</template>

<script></script>

<style></style>
```

Restart the server. Default theme should be overwritten now. Awesomeness!

# Adding tailwindcss

Our last step is to add tailwindcss. Many steps on this article is taken from the installation steps provided by [tailwind](https://tailwindcss.com/docs/installation).

Npm install `tailwindcss` and `autoprefixer`.

```
npm i --save tailwindcss autoprefixer
```

Then create config file for tailwind by running:
 
```
npx tailwind init
```

We now have tailwind.config.js at root. Inside that file, you'll see something like this:

```
module.exports = {
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
}

```

Go back to docs/.vuepress/config.js, add postcss config:

```
module.exports = {
  title: "Hello Tailwind-Press!",
  description: "Blog v0.0.1",
  themeConfig: {
    nav: [
      {
        text: "blogs",
        items: [
          { text: "blog1", link: "/blogs/blog1.md" },
          { text: "blog2", link: "/blogs/blog2.md" }
        ]
      }
    ]
  },
  postcss: {
    plugins: [
      require("autoprefixer"),
      require("tailwindcss")("./tailwind.config.js")
    ]
  }
};
```

Next time server is run, it will run postcss and it will use both autoprefixer and tailwindcss plugins. Right now we haven't had any tailwindcss defined yet. Let's do that now.

Inside docs/.vuepress/theme, create a new css (styl) directory and file. I called the dir "styles" and the file "style.styl'. You can give them any name you want (mine is at `docs/.vuepress/theme/styles/style.styl`. _Most/ all tutorials I've seen use .styl instead of .css. Per [vuepress doc](https://vuepress.vuejs.org/default-theme-config/#simple-css-override), it looks like you can use .css, but they use stylus, so that's what I am going with. I haven't tried it with .css._)

Insert the following inside style.styl:

```
@tailwind base;

@tailwind components;

@tailwind utilities;

```

Great. Our tailwindcss is ready to go. We just need to import it. Inside Layout.vue, add:

```
// Layout.vue

...

<style lang="stylus">
  @import './styles/style.styl';
</style>
```

We haven't mentioned any tailwindcss classes yet. Let's style it up a bit more (_btw, the snippet is mostly taken from [tailwindcss site](https://tailwindcss.com/components/navigation/#responsive-header)_).

```
// Layout.vue

<template>
<nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
  <div class="flex items-center flex-shrink-0 text-white mr-6">
    <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
    <span class="font-semibold text-xl tracking-tight">{{ $site.title }}</span>
  </div>
</nav>
</template>

<script></script>

<style lang="stylus">
	@import './styles/style.styl';
</style>
```

You should see tailwindcss styling. That's it! Now you are free to unleash the power of the dark side... I mean creative side.

![vader impressed](https://media.giphy.com/media/nlWGe7Q64zwQ0/giphy.gif)

Questions are always welcome. Happy hacking!

