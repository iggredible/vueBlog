---
title: JAVASCRIPT: Start using Promisify to avoid JS callback spaghetti
published: true
description: Use promisify to avoid JS callback spaghetti
tags: promisify, callback, javascript, asynchronous
---

Asynchronous codes are common in JS programming, like fetching data from an endpoint and reading dir/files. Often they require us to pass a _callback_ function that will be executed when the action is completed.

# The problem with callback async

The problem with callback async is that they can get messy.

If I want to read a file (using [fs.readFile](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)), I can do it like this:

```
fs.readFile('./file/location.md', 'utf-8', function(err, val){
  if(err) throw new Error ("Something terrible happened")
  console.log("Content: ", val)
})
console.log("Waiting...")
```

You'll notice `"Waiting"` is displayed before `"Content"`. This is because JS automatically moves __all__ async functions at the back of the line (regardless how "fast" they execute). 

Now this is a big deal if we need to use the result of that async function for our next action. If we need to use the result of our callback function, the following won't work:

```
let pathToNextLocation; 
fs.readFile('./file/location1.md', 'utf-8', function(err, val){
  if(err) throw new Error
  pathToNextLocation = val; 
})

console.log(pathToNextLocation); 
```

We will need to do this instead:

```
let pathToNextLocation
fs.readFile('./file/location1.md', 'utf-8', function(err, val){
  if(err) throw new Error
  pathToNextLocation = val; 
  fs.readFile(pathToNextLocation, 'utf-8', function(err, val) {
    // do stuff!
  })
})
```

What if we need to execute four async functions in sequence? We would have to nest it four levels deep. This is one big spaghetti.

![big spaghetti](https://media.giphy.com/media/r9jG5FH7chblC/giphy.gif)

# Better way to handle async: Promises

A better way to deal with async function is to use promises. Promises, like callbacks, are asynchronous. Unlike callbacks, they can be chained.

Promise takes 2 arguments and we need to `resolve` it - think of it like Promise's own way to return value when it is done.

```
new Promise((resolve, reject) =>
  resolve('Hello promise')
)
.then(value => console.log(value))
```

This `then` chain is really awesome, because now we can do something like this:

```
asyncReadFile('./file/to/location1.md', 'utf-8')
.then(value => {
  return anotherPromise
})
.then(value => {
  return anotherPromise
})
.then(value => {
  return yetAnotherPromise
})
// and so on
```

This looks MUCH better than callback spaghetti. 

# Putting the two together: replace all callbacks with promises

We learned two things:
1. Too many callbacks leads to spaghetti code
2. Chained promises are easy to read

However, callbacks functions are not the same thing as promises. `fs.readFile` do not return promises. We can't just use `then` chain on several `fs.readFile` together.

> "Hmm, I wonder if there is a way to convert them callbacks into promises so I can chain them and make them look pretty?" - me thinking

Absolutely!! [Promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) does JUST that.

Promisify is part of util built into Node 8+. It accepts a function that accepts a callback function (wow, that's a mouthful). The resulting function is a function that returns a promise. Let's jump straight into it. It will make sense after we run it ourselves.

Let's create several files in a directory that contains the name of other files to read. Then we will read the first file - see if we can make it to the last file.

```
// file1.md
file2.md

// file2.md
file3.md

// file3.md
Finished!

// reader.js
const fs = require("fs");
const { promisify } = require("util");

const promiseReadFile = promisify(fs.readFile);

promiseReadFile("file1.md", "utf-8")
  .then(content => {
    const nextFileToRead = content.trim();
    return promiseReadFile(nextFileToRead, "utf-8");
  })
  .then(content => {
    const nextFileToRead = content.trim();
    return promiseReadFile(nextFileToRead, "utf-8");
  })
  .then(content => {
    console.log(content.trim());
  });
```

Now let's `node ./reader.js` and see what happens. You should see `"Finished!"` printed.

Sweet! Now that is one spaghetti I don't mind eating.

![delicious spaghetti](https://media.giphy.com/media/3o72F2CaK3Hk53WxGg/giphy.gif)

Javascript has another way to handle promises: [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

To test your understanding, can you convert promisified code above from `then` into `async/await`?

Thanks for reading. Happy hackin'! Let me know if you have questions!

# Resources

1. [util promisify](https://2ality.com/2017/05/util-promisify.html)
2. [node8 util promisify is so awesome](https://medium.com/greyatom/node8s-util-promisify-is-so-awesome-9819f1b56d18)
3. [Promisification](https://javascript.info/promisify)
4. [understanding nodes promisify and callbackify](https://medium.com/trabe/understanding-nodes-promisify-and-callbackify-d2b04efde0e0)
5. [Promise docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
6. [callback functions in nodeJS](https://dev.to/martinnrdstrm/callback-functions-innodejs--2607)
7. [Javascript and asynchronous magic](https://levelup.gitconnected.com/javascript-and-asynchronous-magic-bee537edc2da)
8. [Is JavaScript Synchronous or Asynchronous? What the Hell is a Promise?](https://medium.com/better-programming/is-javascript-synchronous-or-asynchronous-what-the-hell-is-a-promise-7aa9dd8f3bfb)

