---
title: Intro to Virtual DOM
published: true
description: Introduction to Virtual DOM, how to make your own virtual DOM
tags: virtualDOM, DOM, javascript, webdev
---

![HTML Image on Screen](https://thepracticaldev.s3.amazonaws.com/i/v2eqqpibor579mb9jw5a.jpg)
# Intro

Imagine you are building your house. One day you want to add a new kitchen island - so you rebuild the house from scratch. Then you want to repaint the house, so you again rebuild the whole house. Then it's time to change your window panes into, so you rebuild it from scratch...again. Unless you are Fix-It Felix, this is not the way to make house updates.

![fix-it-felix](https://media.giphy.com/media/MtIPR6C5okdt6/giphy.gif)

Instead, you should have a blueprint of the house. To add a kitchen island, you find which area will be affected on the blueprint and only rebuild that area. If you want to repaint, calculate the wall perimeter area from blueprint, move out all the stuff next to the wall (just don't do [this](https://www.youtube.com/watch?v=EiZoSuNej5U) please), and start painting. If you want to change your window panes, locate all windows from blueprint and replace them.

The same can be said about DOM. Think of HTML DOM as a house and virtual DOM as blueprint of the house. We should use virtual DOM to help us make changes to our DOM.
This post is largely inspired by Jason Yu's [Building a Simple Virtual DOM from Scratch](https://www.youtube.com/watch?v=85gJMUEcnkc) video (I am not affiliated with him, but I found his stuff super helpful. You should check him out!). This is a shortened and simplified version. My hope is that readers who are new with virtual DOM will gain better understanding what virtual DOM is.

# Layout of the land

The code can be found in [this github repo](https://github.com/iggredible/simple-vdom-demo). This post is divided into 6 steps:

1. Setup
2. Creating virtual DOM
3. Rendering DOM nodes
4. Mounting into HTML page
5. Updating the DOM the inefficient way
6. Updating the DOM the efficient way

Let's get started!

# Setup

Before we even begin, make sure we have [latest node](https://nodejs.org/en/download/) ready. Create a folder and cd into it, start an NPM project (`npm init -y`). Create `index.html` and `vdom.js` in root directory. For quick bundling, we'll use [`parcel-bundler`](https://github.com/parcel-bundler/parcel) so run `npm install parcel-bundler`. I also like having "start": "parcel index.html" in package.json. 

My `index.html` looks like this:

```
<!DOCTYPE html>
<html lang="en">
  <head> 
    <meta charset="UTF-8"> 
    <title>Basic Virtual Dom Demo</title>
  </head>
  <body> 
    <h1>Virtual Dom Demo</h1> 
    <div id="app"></div> 
    <script src="./vdom.js"></script>
  </body>
</html>
```

Just make sure to import `vdom.js` and have something like `<div id="app"></div>` to mount our DOM later.

# Creating virtual DOM

Virtual DOM is nothing but a *javascript object that represents DOM nodes*. As mentioned earlier, virtual DOM to DOM is what a blueprint is to a house. A house is physical, expensive to update, while a blueprint is just a piece of paper and much easier to update.

This is what our virtual DOM looks like:

```
const vAppStructure = num => {
  return {
    tagName: "ul",
    text: "",
    attrs: { class: "parent-class", id: `parent-id-${num}` },
    children: [
      {
        tagName: "li",
        attrs: "",
        text: "list 1",
        attrs: { class: "child-class" },
        children: []
      },
      {
        tagName: "li",
        attrs: "",
        text: "list 2",
        attrs: { class: "child-class" },
        children: [{ tagName: "input", attrs: "", text: "", children: [] }]
      }
    ]
  };
};
```

Observations:

1. Virtual DOM is a JS object.
2. In this example, it is a function because in the future it needs to be updated. Virtual DOM does not have to be a function at all, it can be a plain JS object (technically you can just do const myVDom = {name: "div"} and that will counts as a VDOM!)
3. The structure represent a `<ul>` element with 2 `<li>` children.
4. The 2nd child has another child, an input. It will be used in step 4 later.

# Rendering DOM Nodes

We have a virtual DOM structure now. We should render it into DOM nodes. The main Javascript APIs needed in this post are: `document.createElement`, `Element.setAttribute`, `document.createTextNode`, and `Element.appendChild`. First to create element, second to set attributes, third to deal with text, and fourth to attach any child into parent. You'll see `$` notation throughout the codes - variables with `$` represent DOM nodes. 

```
const renderer = node => {
  const { tagName, text, attrs, children } = node;
  const $elem = document.createElement(tagName);

  for (const attr in attrs) {
    $elem.setAttribute(attr, attrs[attr]);
  }

  if (text) {
    const $text = document.createTextNode(text);
    $elem.appendChild($text);
  }

  if (children && children.length > 0) {
    for (const child of children) {
      const $child = renderer(child);
      $elem.appendChild($child);
    }
  }

  return $elem;
};
```

Observations:

1. The `tagName` that we have in virtual DOM is rendered using `document.createElement`. 
2. Each `attrs` is iterated and is set onto that newly-created-element.
3. If there is a text, we create and append it into that element.
4. If our virtual DOM contains children, it goes through each child and *recursively* run renderer function on each element (if the children have children, they will go through the same recursion, and so on, until no children is found). The children is appended into the original element.

Now that we have DOM nodes created, attributes and text appended, and children rendered and appended - these DOM nodes can't wait to be attached into our HTML file, so let's mount it!

# Mounting

Think of mounting as placing our nodes into HTML page. We will use `document.replaceWith`.

```
const mount = ($nodeToReplace, $nodeTarget) => {
  $nodeTarget.replaceWith($nodeToReplace);
  return $nodeToReplace;
};
```

Now we have all the functions we need. Let's set up some selectors and mount it:

```
const app = document.querySelector("#app");
let num = 10;
let currentVApp = vAppStructure(num); 
let $vApp = renderer(currentVApp); 
mount($vApp, app);
```

You can run `parcel index.html` (or `npm run start`) and watch your virtual DOM displayed in HTML! Super cool. You have rendered your own HTML page using pure Javascript with virtual DOM! This is basic virtual DOM and it is powerful. Next we will explore the power of virtual DOM by updating it periodically.

# Updating (the inefficient way)

The power of virtual DOM is whenever you update your JS object without needing screen refresh. 
To demonstrate updating, we will use `setInterval` to increase the number per second.

```
let $rootElem = mount($vApp, app);
let newVApp;

setInterval(() => {
  num++;
  newVApp = vAppStructure(num);
  let $newVApp = renderer(newVApp);
  $rootElem = mount($newVApp, $rootElem);

  currentVApp = newVApp;
}, 1000);
```

Now if you open up devTools and observe the id of `ul` element - _it is now increasing by 1_. Sweet! We have a working, self-updating DOM node. Beautiful!!

Observations:

1. Note the assignment$rootElem = mount($newVApp, $rootElem). This is necessary because we are mounting the updated DOM nodes with different number and we are replacing the old one with new one each second. Mounting returns the updated DOM nodes, so we are constantly replacing the old one with new one.
2. There is a problem. Try typing something on input, it gets refreshed each second. This is because the entire DOM is being replaced each second including input. We want to update affected component only without re-rendering the entire DOM.

Let's do it the right way!

# Updating the efficient way

One of the most popular Frontend library in the world, React, uses virtual DOM. The way React treats virtual DOM is by [diffing](https://reactjs.org/docs/reconciliation.html). 
1. React creates virtual DOM of the app and saves a copy. 
2. When a change occurs (say someone updates a state), React compares the previous copy of virtual DOM with recent copy of virtualDOM - it makes a list of all the differences. 
3. React updates the actual DOM based on the differences found.

We will create a (very) simplified version of diffing. 

```
const diff = (oldVApp, newVApp) => {
  const patchAttrs = diffAttrs(oldVApp.attrs, newVApp.attrs);

  return $node => {
    patchAttrs($node);
    return $node; // important to return $node, because after diffing, we patch($rootElem) and it expects to return some sort of element!
  };
};
export default diff;
```

Observations:

1. It takes old virtual DOM and new virtual DOM as arguments. Beware, since it is simplified, it will not try to find the differences between old and new virtual DOM but it will simply apply the new attributes into the DOM elements. 

The `diffAttrs` function looks like this;

```
const diffAttrs = (oldAttrs, newAttrs) => {
  const patches = [];

  for (const attr in newAttrs) {
    patches.push($node => {
      $node.setAttribute(attr, newAttrs[attr]);
      return $node;
    });
  }

  for (const attr in oldAttrs) {
    if (!(attr in newAttrs)) {
      patches.push($node => {
        $node.removeAttribute(attr);
        return $node;
      });
    }
  }
  return $node => {
    for (const patch of patches) {
      patch($node);
    }
  };
};
```

Observations:

1. We are only diffing only attributes and not `text`, `children`, `tagName`. For the sake of brevity I skipped them. The logic is similar though.
2. When iterating through all attributes, each new attribute is set into the element node (so if new one has `id="my-id-2"`), it will set that new id into the element node.
3. We check each `attr` in `oldAttrs`. The assumption is if an attribute is found in `oldAttrs` that does not exist in `newAttrs`, that attribute must have gotten removed, so we delete it.
4. We return a function to perform patch later.

Our updated setInterval will look like this:

```
setInterval(() => {
 num++;
 newVApp = vAppStructure(num);

 const patch = diff(currentVApp, newVApp);
 $rootElem = patch($rootElem);
currentVApp = newVApp;
}, 1000);
```

Observations:

1. Instead of remounting the entire updated HTML element per second, we are setting attributes on new DOM nodes. This will not re-render the entire DOM. `input` now works as expected.

# Conclusion

To recap, here is what we learned:

1. Virtual DOM is a plain JS object describing what a DOM should look like, like a blueprint of a house (whereas a DOM is like a house).
2. Mounting virtual DOM is a process of iterating virtual DOM properties and calling `setElement`, `createTextNode`, `setAttribute`, and `appendChild` (there are more APIs needed in more complicated app ).

3. The best way to update our app is not to replace the entire DOM structure per update (it will force other element to re-render unnecessarily like `input`), but to go through each attribute in each element and set new attributes. Doing this will not re-render the element.

This is far from perfect - it is a simplified representation of what React/ other framework does. 

Thanks for reading this. Appreciate you spending your time and reading! If you have any questions, found mistakes, please feel free to drop by comments. Let me know what new thing you learned from this!

Some resources I found helpful:

- [React Virtual DOM](https://www.codecademy.com/articles/react-virtual-dom)
- [How Virtual-DOM and diffing works in React](https://medium.com/@gethylgeorge/how-virtual-dom-and-diffing-works-in-react-6fc805f9f84e)
- [How Browsers Work](http://taligarsiel.com/Projects/howbrowserswork1.htm)