---
title: JAVASCRIPT: Bundle Your Javascript Code From Scratch 
published: true
description: Lessons from building bundler from scratch
tags: bundler, javascript, packages, webdev
---

# Intro

Bundling is an indispensable part of building modern Javascript app. Webpack, Rollup, Parcel-bunder are some of the big name bundlers. For the most part, bundling has been a magical process: just give the bundler the entry, the output, add some other config, and *POOF*! - suddenly your bundle.js is ready.

![magic](https://thepracticaldev.s3.amazonaws.com/i/6pkw4boytmpzuki9wq31.gif)

In this post, I will explain what a bundler is and why it is a good thing to use one - we will do it by creating one from scratch.

# What a bundler is and why we need it

> A bundler is a tool that puts your entry code along with all its dependencies together in one JS file.

Why would we want to use it? Can't we just upload the entire files and directories of our project and not go through extra step?

Here are two reasons:

1. Javascript initially had no standard/ built-in module system. `import` and `export` syntax is a recent convention in ES6. [Not all browser supports it yet](https://caniuse.com/#feat=es6-module).
2. It is better to put everything together in one bundled file. Imagine a project where we have 5 different JS files. The client will have to make **5 requests** to your server (or CDN, or both - btw, it is [even better](https://stackoverflow.com/questions/7445909/bundling-js-files-vs-cdn) to bundle them and put them in CDN.) - but that is still 4 extra requests that client could have avoided if our project was bundled up in one JS file (client will only have to make one request). _More requests = more overhead_.

I hope these are enough reasons to want to use a bundler. Let's move on to understanding how a bundler works

Best way to understand how something works is to build/ tinker it.

# Building bundler

Before we start, let's go through the basic of what our project will look like.

![bandler logo](https://thepracticaldev.s3.amazonaws.com/i/t0tm22z42vxz0iskdgje.png)

Introducing [Bandler](https://github.com/iggredible/bandler). The tiniest, cutest, awesomest bundler you have ever seen (ok, you can name it whatever. That's just what I named my bundler).

Bandler will have a structure like this:

`entry.js` -> `module1.js` -> `module2.js`

The entry will be called `entry.js`. It will have one dependency, `module1.js`, which has a dependency, `module2.js`.

Our project will use [ES6 module syntax](
https://alligator.io/js/modules-es6/)(`import`/`export`). Our task is to extend the module support to older browser. We have to transpile the ES6 syntax into something all/ most browsers can understand.

Here are 8 steps how should do it:
1. Read content of `entry.js`
2. Parse that content and make a **list** of all `import` declarations
3. Transpile the content from step 1 from ES6 to ES5
4. Assign each dependency file with unique ID to be referenced later (for example, if we use `import module1 from './module1.js'` in entry, `./module1.js` is a dependency and we will map this with a unique ID)
5. Put all of the info from steps 2-4 in one object
6. Create a 'dependency graph' (by iterating through all dependencies,  all dependencies of each dependency, and so on; repeat steps 1-5)
7. Pack everything in step 6 together
8. Celebrate because our bundler is done! 🎊🙌 

If it looks complicated, don't worry, because it is not.

## Starting Project

In this section we'll do the setup: start a new directory for our project, `cd` into it, and install some libraries.

`mkdir bundler-playground && cd $_`

Start npm project. 

`npm init -y`

Install some additional libraries:
1. `@babel/parser` to parse our code and returns an AST object
2. `@babel/traverse` to traverse/ walk through our AST object; this will help us look for all import declarations
3. `@babel/core` to transpile ES6 -> ES5
4. `resolve` to get full path of each dependency (ex: turn `./module1.js` into something like `/User/iggy/project/bundler-playground/module1.js`)

`npm install --save @babel/parser @babel/traverse @babel/core resolve`

Create a new `index.js` in root, and add import these guys:

```
 const fs = require("fs");
 const path = require("path");
 const parser = require("@babel/parser");
 const traverse = require("@babel/traverse").default;
 const babel = require("@babel/core"); 
 const resolve = require("resolve").sync;
```

## Get module info

In this section, we will:
1. Assign a particular `filePath` with unique ID (to be referenced later)
2. Get all dependencies used by this file (list all `import`s used)
3. Transpile ES code

Here is the code for this section.

```
let ID = 0;

function createModuleInfo(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module"
  });
  const deps = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      deps.push(node.source.value);
    }
  });
  const id = ID++;
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"]
  });

  return {
    id,
    filePath,
    deps,
    code
  };
}
```
We got the file content using [`readFileSync()`](https://nodejs.org/api/fs.html#fs_fs_readfilesync_path_options). Then we parsed the content to get [AST](https://stackoverflow.com/questions/16127985/what-is-javascript-ast-how-to-play-with-it) information. Once AST is acquired, we traversed the AST and look for all import instances using [`ImportDeclaration`](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md#importdeclaration) API. Lastly, we transpiled our code from ES6 using babel core's [`transformFromAstSync`](https://babeljs.io/docs/en/babel-core#transformfromastsync).

For ID, we used a simple incrementing number (it's better to use random GUID, since it is a demo, `ID++` will do)

With this, we have ourselves a nifty module information consisting of a unique ID, list of all dependencies (all imports), and the code inside that module. Next, we iterate the process for all relevant modules to create a dependency graph.

## Creating Dependency Graph

Dependency graph is a collection of interrelated modules used in our app, starting from entry point. 

Here is a code for this section.

```
function createDependencyGraph(entry) {
  const entryInfo = createModuleInfo(entry);
  const graphArr = [];
  graphArr.push(entryInfo);
  for (const module of graphArr) {
    module.map = {};
    module.deps.forEach(depPath => {
      const baseDir = path.dirname(module.filePath);
      const moduleDepPath = resolve(depPath, { baseDir });
      const moduleInfo = createModuleInfo(moduleDepPath);
      graphArr.push(moduleInfo);
      module.map[depPath] = moduleInfo.id;
    });
  }
  return graphArr;
}
```

We will be using an array type for our dependency graph. We start by pushing our entry info first. 

Then we iterate through dependency graph elements (starting with entry).

```
const baseDir = path.dirname(module.filePath);
const moduleDepPath = resolve(depPath, { baseDir });
const moduleInfo = createModuleInfo(moduleDepPath);
graphArr.push(moduleInfo);
```

Here we use `path.dirname` and `resolve` to get full path of each module, get the info using the full path, and push that info into our dependency graph array.

Note these lines:

```
module.map = {};
...
module.map[depPath] = moduleInfo.id;
```

Here we add an additional attribute `map` inside our `moduleInfo` object. This attribute will be used on next step as a *lookup* to map each module with unique identifier. For example:

| module     | ID |
|------------|----|
| entry.js   | 0  |
| module1.js | 1  |
| module2.js | 2  |
| etc        | n  |

In the end, we end up with an array of module infos of all dependency used in the entire project.

## Packing them all together

Now that we have dependency graph, the last step is to **pack** them together. 

![mickey packing](https://thepracticaldev.s3.amazonaws.com/i/0rz8w9epr6il0ie6rea4.gif)

```
function pack(graph) {
  const moduleArgArr = graph.map(module => {
    return `${module.id}: {
      factory: (exports, require) => {
        ${module.code}
      },
      map: ${JSON.stringify(module.map)}
    }`;
  });
  const iifeBundler = `(function(modules){
    const require = id => {
      const {factory, map} = modules[id];
      const localRequire = requireDeclarationName => require(map[requireDeclarationName]); 
      const module = {exports: {}};
      factory(module.exports, localRequire); 
      return module.exports; 
    } 
    require(0);
  })({${moduleArgArr.join()}})
  `;
  return iifeBundler;
}
```

First, we create a factory pattern over the code of each module. It pass an `export` and `require`. Keep these 2 arguments in mind. We are keeping the map from previous step.

```
return `${module.id}: {
  factory: (exports, require) => {
    ${module.code}
  },
  map: ${JSON.stringify(module.map)}
  }`;
```

Second, we created an IIFE to run the entire dependency graphs together. The next part might be confusing - I struggled to understand this part initially, but with patience, it will make sense!

```
  const iifeBundler = `(function(modules){
    const require = id => {
      const {factory, map} = modules[id];
      const localRequire = requireDeclarationName => require(map[requireDeclarationName]); 
      const module = {exports: {}};
      factory(module.exports, localRequire); 
      return module.exports; 
    } 
    require(0);
  })({${moduleArgArr.join()}})
  `;
```

1. We are using IIFE pattern to scope the variables so they do not affect global variables
2. The dependency graph we created earlier section is being passed as the argument (`${moduleArgArr.join()}`)
3. That dependency graph is being passed inside IIFE as `modules`
4. We created a `require(id)` function. This function has two effects:
  - It recursively calls its own with the ID of other dependencies via `require(map[requireDeclarationName])`. This translates to something like `require(1)` - recalling the mapping function earlier, turns into `require('./module1.js')`
  - It executes the actual code from step 1 (createModuleInfo) step when it runs `factory(module.exports, localRequire)`
  - This function returns `module.exports` - although it is initially empty (`{exports: {}}`), after running `factory()`, the value of this `module.exports` is the `exports` value inside `factory` we created earlier (think about it)


## Code Repo

The final code for this blog can be found [here](https://github.com/iggredible/bandler/tree/ce43fa000b16931e9518e94506a81b381eed764b) to compare code.

The full code will look something like this:

```
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser"); // parses and returns AST
const traverse = require("@babel/traverse").default; // AST walker
const babel = require("@babel/core"); // main babel functionality
const resolve = require("resolve").sync; // get full path to dependencies

let ID = 0;

/*
 * Given filePath, return module information
 * Module information includes:
 * module ID
 * module filePath
 * all dependencies used in the module (in array form)
 * code inside the module
 */
function createModuleInfo(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const ast = parser.parse(content, {
    sourceType: "module"
  });
  const deps = [];
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      deps.push(node.source.value);
    }
  });
  const id = ID++;
  const { code } = babel.transformFromAstSync(ast, null, {
    presets: ["@babel/preset-env"]
  });

  return {
    id,
    filePath,
    deps,
    code
  };
}

/*
 * Given entry path,
 * returns an array containing information from each module
 */
function createDependencyGraph(entry) {
  const entryInfo = createModuleInfo(entry);
  const graphArr = [];
  graphArr.push(entryInfo);
  for (const module of graphArr) {
    module.map = {};
    module.deps.forEach(depPath => {
      const baseDir = path.dirname(module.filePath);
      const moduleDepPath = resolve(depPath, { baseDir });
      const moduleInfo = createModuleInfo(moduleDepPath);
      graphArr.push(moduleInfo);
      module.map[depPath] = moduleInfo.id;
    });
  }
  return graphArr;
}

/*
 * Given an array containing information from each module
 * return a bundled code to run the modules
 */
function pack(graph) {
  const moduleArgArr = graph.map(module => {
    return `${module.id}: {
      factory: (exports, require) => {
        ${module.code}
      },
      map: ${JSON.stringify(module.map)}
    }`;
  });
  const iifeBundler = `(function(modules){
    const require = id => {
      const {factory, map} = modules[id];
      const localRequire = requireDeclarationName => require(map[requireDeclarationName]); 
      const module = {exports: {}};

      factory(module.exports, localRequire); 
      return module.exports; 
    } 
    require(0);
  })({${moduleArgArr.join()}})
  `;
  return iifeBundler;
}

console.log("***** Copy code below and paste into browser *****");

/* create dependency graph */
const graph = createDependencyGraph("./entry.js"); // wherever your entry is
/* create bundle based on dependency graph */
const bundle = pack(graph);

console.log(bundle);
console.log("***** Copy code above and paste into browser *****");

```

If we run `node ./index.js`, we'll get something like

```
(function(modules){
    const require = id => {
      const {factory, map} = modules[id];
      const localRequire = requireDeclarationName => require(map[requireDeclarationName]);
      const module = {exports: {}};

      factory(module.exports, localRequire);
      return module.exports;
    }
    require(0);
  })({0: {
      factory: (exports, require) => {
        "use strict";

var _module = _interopRequireDefault(require("./module1.js"));

var _module2 = _interopRequireDefault(require("./module2.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _module["default"])();
(0, _module2["default"])();
      },
      map: {"./module1.js":1,"./module2.js":2}
    },1: {
      factory: (exports, require) => {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _module = _interopRequireDefault(require("./module2.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var module1 = function module1() {
  (0, _module["default"])();
  console.log("hello from module1!");
};

var _default = module1;
exports["default"] = _default;
      },
      map: {"./module2.js":3}
    },2: {
      factory: (exports, require) => {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var module2 = function module2() {
  console.log("Hello from module2!");
};

var _default = module2;
exports["default"] = _default;
      },
      map: {}
    },3: {
      factory: (exports, require) => {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var module2 = function module2() {
  console.log("Hello from module2!");
};

var _default = module2;
exports["default"] = _default;
      },
      map: {}
    }})(function(modules){
    const require = id => {
      const {factory, map} = modules[id];
      const localRequire = requireDeclarationName => require(map[requireDeclarationName]);
      const module = {exports: {}};

      factory(module.exports, localRequire);
      return module.exports;
    }
    require(0);
  })({0: {
      factory: (exports, require) => {
        "use strict";

var _module = _interopRequireDefault(require("./module1.js"));

var _module2 = _interopRequireDefault(require("./module2.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _module["default"])();
(0, _module2["default"])();
      },
      map: {"./module1.js":1,"./module2.js":2}
    },1: {
      factory: (exports, require) => {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _module = _interopRequireDefault(require("./module2.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var module1 = function module1() {
  (0, _module["default"])();
  console.log("hello from module1!");
};

var _default = module1;
exports["default"] = _default;
      },
      map: {"./module2.js":3}
    },2: {
      factory: (exports, require) => {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var module2 = function module2() {
  console.log("Hello from module2!");
};

var _default = module2;
exports["default"] = _default;
      },
      map: {}
    },3: {
      factory: (exports, require) => {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var module2 = function module2() {
  console.log("Hello from module2!");
};

var _default = module2;
exports["default"] = _default;
      },
      map: {}
    }})
```

Copy/Paste that into browser and you'll see

```
Hello from module2!
hello from module1!
Hello from module2!
```

Congratulations! We have just built an entire bundler... from scratch!!

![traveling with giant luggage](https://thepracticaldev.s3.amazonaws.com/i/ppozpb2ciyp2ciitsih7.gif)
 

## Bonus

In addition to creating an ES6 bundler, I attempted to create a bundler that bundles either CJS and ES6, [Bandler](https://github.com/iggredible/bandler) ([NPM](https://www.npmjs.com/package/bandler))

I won't go too deep here - but in addition to using babel parser and babel traverse, I used [`detective`](https://www.npmjs.com/package/detective) library that specifically searches and lists all CJS requires (ex: `require('./your/lib.js')`) instances from a project. I saw that Babel does not have CJS syntax declaration [here](https://github.com/babel/babel/blob/master/packages/babel-parser/ast/spec.md). 

Can you think of some other ways to make CJS and ES6 bundler?

## Resources, links, etc

Popular bundlers
- [browserify](http://browserify.org/)
- [webpack](https://webpack.js.org/)
- [rollup](https://rollupjs.org/guide/en/)
- [parcel-bundler](https://github.com/parcel-bundler/parcel)

Inspirations for this post
- [minipack](https://github.com/ronami/minipack/blob/master/src/minipack.js)
- [wbpck-bundler](https://github.com/adamisntdead/wbpck-bundler)

Readings on bundlers
- [bundler overview](https://medium.com/@gimenete/how-javascript-bundlers-work-1fc0d0caf2da)
- [create your own bundler](https://www.freecodecamp.org/news/anatomy-of-js-module-systems-and-building-libraries-fadcd8dbd0e/) - creator of wbpck-bundler mentioned above
- [small list of popular js bundlers](https://dev.to/kayis/4-javascript-bundlers-2g4b)
- (Yet another) [list of build tools](https://survivejs.com/webpack/appendices/comparison/)