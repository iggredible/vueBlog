---
title: How to conditionally render convertkit on vuejs
published_at: 2019-12-31
description: How to render Convertkit only on select pages in SPA
---

I started using [convertkit](https://convertkit.com/) for mailing list. It is an awesome service for creators to help them grow mailing list. I recently encountered a problem where I need my form to be displayed on all my blogs page, but not on my About page. My blog (at the time of this writing) uses VueJS, but this problem may occur on any Single Page App (SPA). I will explain how I fixed it.

TLDR:
1. ConvertKit form is being displayed on all pages in SPA apps
2. Use navigation guard to programatically embed forms only on matching routes
3. Use navigation guard to remove embedded code on routes where we don't want to display the guard

# The issue

There are several ways to embed Convertkit into a page:
1. Javascript
2. HTML
3. Share
4. Wordpress
5. Unbounce

The method that I use is method 1, Javascript. Using the embed script, I pasted it into my `public/index.html`. The problem is, it shows up everywhere, on every single page.

I need it to show up on specific pages, mainly "Blogs" and "Blog" pages. I definitely do not need it on About page

# The cause

When I pasted the ConvertKit code to public directory, it is being displayed everywhere. Being SPA, everything actually lives inside `<div id="app"></div>`.

So the embedded CK form lives outside my app. First, we need to move the embed INSIDE Vue app.

The problem is, I can't just drop `<script src="...">` inside my Vue component. Vue components don't know what to do with script tag.

# The fix

For my solution, I decided to use Vue navigation [guards](https://router.vuejs.org/guide/advanced/navigation-guards.html).

Here is the code that I use (my project originally started using vue-cli. main.js is where Vue instance is mounted to `#app`. You can do it wherever you add `VueRouter` into your app.)

```
...
// main.js
const router = new VueRouter(routes);

router.beforeEach((to, from, next) => {
  const ckScript = document.querySelector("script[src*=convertkit]");
  const ckForm = document.querySelector("form");
  if ((ckForm || ckScript) && (to.name === "Blog" || to.name === "Blogs")) {
    next();
  }

  if (ckForm) document.body.removeChild(ckForm);
  if (ckScript) document.body.removeChild(ckScript);

  if (to.name === "Blog" || to.name === "Blogs") {
    let ckEmbed = document.createElement("script");
    ckEmbed.setAttribute(
      "src",
      "https://your-CK-url"
    );
    ckEmbed.setAttribute("data-uid", "12345ABC"); // your ConvertKit data-uid
    ckEmbed.async = true;
    document.body.appendChild(ckEmbed);
  }
  next();
});
```

Let me explain the code above.

After playing around with ConvertKit, I realized that the original embedded script adds 2 HTML elements: a script with `src="...convertkit"` and a `form`. My strategy is to intercept the URL requests. If they are going to either Blog or Blogs, I need to add the ConvertKit JS script.

First I want to make sure that whenever we go to new page, we look for those elements (`src=...convertkit` and `form`) and delete them. Doing this will remove the form from being displayed.

This will find the two elements and delete them if they exist:

```
  const ckScript = document.querySelector("script[src*=convertkit]");
  const ckForm = document.querySelector("form");
  ...
  if (ckForm) document.body.removeChild(ckForm);
  if (ckScript) document.body.removeChild(ckScript);
```

If we are headed to Blog or Blogs, I don't want them to be deleted. I want them to be displayed.

```
  if ((ckForm || ckScript) && (to.name === "Blog" || to.name === "Blogs")) {
    next();
  }
```

We need to embed the script the way ConvertKit wants us to. I used `createElement` DOM methods to add a new script src, and sets its attributes to whatever convertKit tells.
```
  if (to.name === "Blog" || to.name === "Blogs") {
    let ckEmbed = document.createElement("script");
    ckEmbed.setAttribute(
      "src",
      "https://your-CK-url"
    );
    ckEmbed.setAttribute("data-uid", "12345ABC"); // your ConvertKit data-uid
    ckEmbed.async = true;
    document.body.appendChild(ckEmbed);
  }
```

Btw, you may notice the extra logic below in the if statement. For optimization, I don't want to remove and add ConvertKit script each time we go between blogs. If we going to different Blogs, we should leave the forms alone, so I added a logic to check if `ckForm` or `ckScript` exist. If they do AND if we are headed to either Blog or Blogs, we don't need to remove/ add anything.

```
  if ((ckForm || ckScript) && (to.name === "Blog" || to.name === "Blogs")) {
    next();
  }
```

You can find the documentations here:
- [`createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)
- [`appendChild`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

As an additional optimization, I also added
```
  if (process.env.NODE_ENV === "production") {
    ...
  }
```

So when I am on development environment, I won't have the convetkit page. This saves me some time from loading the form when I don't need it locally.

# Conclusion

I am happy with the result. I assume this approach would work with other SPA apps like React. I believe [React router](https://github.com/ReactTraining/react-router) has something similar. This [SO post](https://stackoverflow.com/questions/42253277/react-router-v4-how-to-get-current-route) might help. I am not too sure about Angular, but I assume most SPA framework would have similar capability.

Thanks for reading! Let me know if you notice an error. Have a great 2020!
