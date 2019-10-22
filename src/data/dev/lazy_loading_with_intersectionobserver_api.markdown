---
title: Lazy Loading With IntersectionObserver API
published: true
description: strategy to use intersection observer for lazy loading
tags: javascript, webdev, lazy-loading, IntersectionObserver
---

![lazy-kat](https://thepracticaldev.s3.amazonaws.com/i/dfhkoiqimufpr5zv0z36.gif)

Hello dev.to folks! This is my first post - woot! Pretty excited to share what I have been learning recently about lazy-loading. Please let me know how I can make this better! 

Lazy loading image is useful for loading page with many contents. We can easily find libraries to do that, such as [yall.js](https://github.com/malchata/yall.js) and [lozad.js](https://apoorv.pro/lozad.js/). What most of these libraries have in common is they both use [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). Let’s learn how to use `IntersectionObserver` so we can understand how these libraries work — or even write our own!

First, I will briefly explain what `IntersectionObserver` does and second, how to use it to lazy load your own images.

# What Does IntersectionObserver do?

(In layman’s words) `IntersectionObserver` *asynchronously detects when an element intersects with ancestor element (usually viewport) and calls a callback function.*

![viewport schematics](https://thepracticaldev.s3.amazonaws.com/i/gwvj2lrwfy97ljpj9lv3.png)

Imagine a viewport containing images. When page loads, some images are positioned directly within viewport while some are sitting below viewport, waiting for user to scroll down so they can be seen. As user scrolls down, the top part of some lower-positioned images would eventually intersect with the bottom viewport. It is when the first top image pixel intersects with viewport the callback function loads the image. 

# Sample Usage

Let’s read the docs! Mozilla kindly gives us a starting point.

```
var options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0
}

var observer = new IntersectionObserver(callback, options);
var target = document.querySelector('#listItem');
observer.observe(target);
```


Above is the minimum setup to lazy load `#listItem` (technically options is optional, so `var observer = new IntersectionObserver(callback);` is a more concise way to run it).

Aight, let’s use it on a more realistic scenario. We are going to:

1. Have 10 images in HTML that we will lazy load
2. Add CSS fade animation
3. Add IntersectionObserver to load images

# HTML Setup

```
<div><img data-src=”http://placehold.it/300x300?text=1"></div>
<div><img data-src=”http://placehold.it/300x300?text=2"></div>
<div><img data-src=”http://placehold.it/300x300?text=3"></div>
<div><img data-src=”http://placehold.it/300x300?text=4"></div>
<div><img data-src=”http://placehold.it/300x300?text=5"></div>
<div><img data-src=”http://placehold.it/300x300?text=6"></div>
<div><img data-src=”http://placehold.it/300x300?text=7"></div>
<div><img data-src=”http://placehold.it/300x300?text=8"></div>
<div><img data-src=”http://placehold.it/300x300?text=9"></div>
<div><img data-src=”http://placehold.it/300x300?text=10"></div>
```

If you notice, it does not use `src` but `data-src` attribute. One strategy for lazy loading is to start with HTML’s `data-*` attribute because `data-src` will not load the image.

# CSS Setup

```
.fade {
 animation-duration: 3s;
 animation-name: fade;
}
@keyframes fade {
 from {
 opacity: 0;
 }
 to {
 opacity: 1;
 }
}
```

This setup is optional. I think helps with our observation (plus it is more aesthetically pleasing) to have the image lazy load with fade animation.

Btw, you can check when the image is downloaded on network tabs if you use Chrome DevTool.

# JS Setup

I want the images to load only when 50% of it intersects with viewport. This is how to set it up:

```
const images = document.querySelectorAll(‘img’)
const observer = new IntersectionObserver(entries => {
 entries.forEach(entry => {
 if(entry.isIntersecting) {
 const target = entry.target
 target.setAttribute(‘src’, target.dataset.src)
 target.classList.add(‘fade’)
 observer.unobserve(target)
 }
 })
}, {
 threshold: 0.5
})
images.forEach(image => observer.observe(image))
```

I want to highlight a few things that I was struggling to understand when learning IntersectionObserver.

- The argument entries represents all the image element under `IntersectionObserver` (I find it a bit odd having to iterate twice with `images.forEach` and `entries.forEach`, but that’s the way it is done). At initial page load, all entries are called. Some immediately intersects (if they are within viewports when page renders) while some don’t. The ones that immediately intersects have their callback function called immediately.

- `entry.isIntersecting` returns true when the image intersects with viewport. Another common check for intersectionality is `entry.intersectionRatio > 0`.

- As mentioned before, a common strategy for lazy-loading is to initially start without `src`. We transfer values from `data-src` to `src` right before user is about to see it.

- It is good practice to unobserve the object after it has been loaded.
We can change the amount or location of intersectionality with either `threshold` or `rootMargin` option. The ancestor element can be changed with root (default is viewport).

# Conclusion

At the time of this writing, intersectionObserver is usable in major browsers except for IE. Check [caniuse](https://caniuse.com/#feat=intersectionobserver) site for complete list.

`IntersectionObserver` is useful to lazy load element into viewport by passing the value from data-src into src upon callback. The same strategy can be applied to other elements.

Below are articles I read regarding `IntersectionObserver` I found useful (I am not affiliated with any of them, just appreciative of the information they gave and I hope it will help you too!)

- [fireship](https://fireship.io/snippets/intersection-observer-lazy-load-images/)

- [alligatorio](https://alligator.io/js/intersection-observer/)

- [googledev](https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/)

Please feel free to let me know if you find any mistakes or how I can improve this. Thank you so much for reading this far. Y’all are awesome!