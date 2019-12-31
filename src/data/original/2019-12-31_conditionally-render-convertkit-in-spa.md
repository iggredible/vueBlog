---
title: Conditionally Render Convertkit in Single Page App
published_at: 2019-12-31
description: How to render Convertkit only on select pages in SPA
---

I recently started using [convertkit](https://convertkit.com/) for mailing list needs. It is an awesome service for creators to help them grow mailing list and earn living online. You should try it. They offer 1 month trial. I tried it and loved it!! And no, I am not an affiliate or anything at all. JUst saying this out of happy customer experience

TLDR:
1. convertkit form is being displayed on all page in SPA apps
2. Use navigation guard to programatically embed only on matching routes
3. Use navigation guard to remove embedded code on routes that we don't want to display the guard

# The issue
There are several ways to embed Convertkit into a page:
1. Javascript
2. HTML
3. Share
4. Wordpress
5. Unbounce

The method that I use is method 1, Javascript. At the moment of this writing, my blog is written in VueJS. It is a SPA. Using the embed script, I pasted it into my `public/index.html`

The problem is, it shows up everywhere, on every single page.

I need it to show up on specific pages, mainly "Blogs" and "Blog" pages. I definitely do not need it on About page

# The cause
When I pasted the convertkit code into public, it pasted it everywhere. Vue is a single page app, and being single page app, everything actually lives inside `<div id="app"></div>`.

So the embedded CK form lives outside my app. We need to move the embed INSIDE Vue app.

The problem is, I can't just drop `<script src="...">` inside my Vue component.

# The fix
For my solution, I decided to take advantage of vue router's navigation [guards](https://router.vuejs.org/guide/advanced/navigation-guards.html).

```
router.beforeEach((to, from, next) => {
  // no need to load CK if we are in development. Only do this in production
  // if (process.env.NODE_ENV === "production") {
  if (true) {
    // select DOM element by src https://stackoverflow.com/questions/19252339/get-element-by-src-attribute-with-javascript-not-jquery
    const ckScript = document.querySelector("script[src*=convertkit]");
    const ckForm = document.querySelector("form");
    if (ckForm && (to.name === "Blog" || to.name === "Blogs")) {
      next();
    }
    if (ckScript && (to.name === "Blog" || to.name === "Blogs")) {
      next();
    }
    if (ckForm) document.body.removeChild(ckForm);
    if (ckScript) document.body.removeChild(ckScript);
    // want to embed ck only on Blog/ BLogs
    if (to.name === "Blog" || to.name === "Blogs") {
      let ckEmbed = document.createElement("script");
      ckEmbed.setAttribute(
        "src",
        "https://your-CK-url"
      );
      ckEmbed.setAttribute("data-uid", "714f9a79e6");
      ckEmbed.async = true;
      document.body.appendChild(ckEmbed);
    }
  }
  next();
});
```

Let me explain the code above.

Router guards intercepts URL requests. After playing around with CK, I realized that the embedded script adds 2 HTML elements: a script with src="...convertkit" and a form.

First I want to make sure that whenever we go to new page, we look for those elements and delete them. This will remove the form from being displayed.

Only when we are on "Blog" or "Blogs", we don't delete them. Also, we need to embed the script the way ConvertKit wants s to. I used `createElement` DOM methods to add a new script src, and sets its attributes to whatever convertKit tells.

For optimization, I don't want to add the embed and remove it on each page, so I added
```
    if ((ckForm || ckScript) && (to.name === "Blog" || to.name === "Blogs")) {
      next();
    }
```
This way if I am Inside Blog/ Blogs, it will skip the appnding altogether.

You can find the documentations here:
https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild

As an additional optimization, I also added
```
  if (process.env.NODE_ENV === "production") {
    ...
  }
```
So when I am on development environment, I won't have the convetkit page. This saves me some time from loading the form when I don't need it locally.

# Conclusion

I am happy with the result. I assume this approach would work with React. I believe reactrouter has something similar
https://stackoverflow.com/questions/42253277/react-router-v4-how-to-get-current-route
https://github.com/ReactTraining/react-router
that we can use. I am not too sure about Angular, but I assume most SPA framework would have similar capability.
It works great on vue app.

