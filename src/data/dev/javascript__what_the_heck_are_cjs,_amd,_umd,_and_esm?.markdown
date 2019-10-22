---
title: JAVASCRIPT: What the heck are CJS, AMD, UMD, and ESM?
published: true
description: Differences between CJS, AMD, UMD, ESM
tags: Javascript, modules, CJS, ESM
---

In the beginning, Javascript did not have a way to import/export modules. This is a problem. Imagine writing your app in just one file - it would be nightmarish!

Then, people much, much smarter than me attempted to add modularity to Javascript. Some of them are __CJS, AMD, UMD, and ESM__. You may have heard some of them (there are other methods, but these are the big players).

I will cover high-level information: syntax, purpose, and basic behaviors. My goal is to help readers recognize when they see them in the wild 💡.


# CJS
CJS is short for CommonJS. Here is what it looks like:

```
//importing 
const doSomething = require('./doSomething.js'); 

//exporting
module.exports = function doSomething(n) {
  // do something
}
```

- Some of you may immediately recognize CJS syntax from node. That's because node [uses CJS module format](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/). 
- CJS imports module synchronously.
- You can import from a library `node_modules` or local dir. Either by  `const myLocalModule = require('./some/local/file.js')` or `var React = require('react');` works.
- When CJS imports, it will give you a __copy__ of the imported object.
- CJS will not work in the browser. It will have to be transpiled and bundled.


# AMD
AMD stands for Asynchronous Module Definition. Here is a sample code:

```
define(['dep1', 'dep2'], function (dep1, dep2) {
    //Define the module value by returning a value.
    return function () {};
});
```
or
```
// "simplified CommonJS wrapping" https://requirejs.org/docs/whyamd.html
define(function (require) {
    var dep1 = require('dep1'),
        dep2 = require('dep2');
    return function () {};
});
```

- AMD imports modules asynchronously (hence the name). 
- AMD is [made for frontend](http://tagneto.blogspot.com/2011/04/on-inventing-js-module-formats-and.html) (when it was proposed) (while CJS backend).
- AMD syntax is less intuitive than CJS.
I think of AMD as the exact opposite sibling of CJS. 

# UMD

UMD stands for Universal Module Definition. Here is what it may look like ([source](http://bob.yexley.net/umd-javascript-that-runs-anywhere/)):
```
(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "underscore"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"), require("underscore"));
    } else {
        root.Requester = factory(root.$, root._);
    }
}(this, function ($, _) {
    // this is where I defined my module implementation

    var Requester = { // ... };

    return Requester;
}));
```

- Works on front and back end (hence the name _universal_).
- Unlike CJS or AMD, UMD is more like a pattern to configure several module systems. Check [here](https://github.com/umdjs/umd/) for more patterns.
- UMD is usually used as a fallback module when using bundler like Rollup/ Webpack

# ESM

ESM stands for ES Modules. It is Javascript's proposal to implement a [standard](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) module system. I am sure many of you have seen this:

```
import React from 'react';
```

Other sightings in the wild:
```
import {foo, bar} from './myLib';

...

export default function() {
  // your Function
};
export const function1() {...};
export const function2() {...};
```

- Works in [many modern browsers](https://caniuse.com/#feat=es6-module)
- It has the best of both worlds: CJS-like simple syntax and AMD's async
- [Tree-shakeable](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/), due to ES6's [static module structure](https://exploringjs.com/es6/ch_modules.html#static-module-structure) 
- ESM allows bundlers like Rollup to [remove unnecessary code](https://dev.to/bennypowers/you-should-be-using-esm-kn3), allowing sites to ship less codes to get faster load.
- Can be called in HTML, just do:

```
<script type="module">
  import {func1} from 'my-lib';

  func1();
</script>
```
This may not work 100% in all browsers yet ([source](https://jakearchibald.com/2017/es-modules-in-browsers/)).


# Summary

- ESM is the best module format thanks to its simple syntax, async nature, and tree-shakeability.
- UMD works everywhere and usually used as a fallback in case ESM does not work
- CJS is synchronous and good for back end. 
- AMD is asynchronous and good for front end.

Thanks for reading, devs! In the future, I plan to write in depth about each module, especially ESM because it is packed with many awesomeness. Stay tuned! 

Let me know if you notice any errors.

# Resources:

- [basic js modules](https://www.freecodecamp.org/news/anatomy-of-js-module-systems-and-building-libraries-fadcd8dbd0e/)
- [CJS in nodejs](https://blog.risingstack.com/node-js-at-scale-module-system-commonjs-require/)
- [CJs-ESM comparison](https://jsmodules.io/cjs.html)
- [On inventing JS module formats and script loaders](http://tagneto.blogspot.com/2011/04/on-inventing-js-module-formats-and.html)
- [Why use AMD](https://requirejs.org/docs/whyamd.html)
- [es6 modules browser compatibility](https://caniuse.com/#feat=es6-module)
- [Reduce JS payloads with tree-shaking](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/tree-shaking/)
- [JS modules - static structure](https://exploringjs.com/es6/ch_modules.html#static-module-structure)
- [ESM in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/)
- [ES Modules deep dive - cartoon](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- [Reasons to use ESM](https://dev.to/bennypowers/you-should-be-using-esm-kn3)
