---
title: JAVASCRIPT: Start using memoization to reduce computing time
published: true
description: introduction to javascript memoization
tags: javascript, memoization, performance, cache
---


One classic CS question is to create [Fibonacci]((https://www.mathsisfun.com/numbers/fibonacci-sequence.html)) sequence. One of the solutions is a recursive function and it looks something like this:

```
function fib(n) {
  if (n === 0 || n === 1)
    return n;
  else
    return fib(n - 1) + fib(n - 2);
}
```

A major problem with recursive fibonacci function above is that it is an expensive function. It calls itself too many times. Calling fib(40) took about 30 seconds on my poor 2015 Macbook air (it calls itself _102,334,155_ times), fib(45) almost 5 minutes (calls itself _1,134,903,170_ times - a **billion** time).

Good luck calling fib(100). 

![tearful cry](https://media.giphy.com/media/qQdL532ZANbjy/giphy.gif)

Is there anything we can do to shorten an expensive function like this?

# Enter memoization

[Memoization](https://en.wikipedia.org/wiki/Memoization) (rhymes with memorization) is a technique in CS to save previous result into a cache so when the function is called again with same argument, it would just return value from the cache and execute the function again. It is useful for expensive functions like fibonacci.

# How do we use memoization on fibonacci?

We can use:

```
const fib = (function() {
  const cache = {};

  function f(n) {
    let value;

    if (n in cache) {
      value = cache[n];
    } else {
      if (n === 0 || n === 1)
        value = n;
      else
        value = f(n - 1) + f(n - 2);

        cache[n] = value;
    }

    return value;
  }

  return f;
})();
```
(Source: [here](https://www.sitepoint.com/implementing-memoization-in-javascript/). All credit for above goes to author).

Try the function above and run fib(40), fib(50), and even fib(100). You'll feel the difference.

# How does memoization works?

It stores values on JS object (`const cache = {};`) so if the same value is called again, it will fetch the value from `cache` instead of executing the function. 


Let's say we want to call fib(5). When fib(5) is called the first time, since cache is empty and it could not find 5 in cache (`if (n in cache)` is falsy), it executes fibonacci logic (`value = f(n - 1) + f(n - 2);`) and then saves the result to cache  (`cache[n] = value;`). Now we have a cache for `n = 5` - something like this: `{5: 5}` (btw, value of fib(5) is 5).

The next time we call fib(5) again, it finds (`{5: 5}`) in cache. Instead of executing fib(5) again, it simply returns the value from cache lookup `value = cache[n]; ... return value;`. Since our fibonacci is recursive, when we call for fib(5), it automatically fills up the cache with values up to 5. Calling fib(5) creates cache for fib(4), fib(3), etc.

Another example is, say we have just called fib(49) and we want to call fib(50) next. Before we call fib(50), inside our cache, we would have cache values like this:

```
{
  0: 0,
  1: 1,
  2: 1,
  3: 2,
  ...
  48: 4807526976,
  49: 7778742049
}
```

We already have values from 0 to 49! All we need to do is to call `value = f(n - 1) + f(n - 2);` - aka fib(49) + fib(48), which we already have stored in cache! This is how memoized fib(50) returns the result almost instantaneously compared to its non-memoized version.

# Sweet! I am going to memoize every function in sight!

Unfortunately, not everything is memoizable. We can only memoize pure functions.

To be a pure function, it must:
1. Have return value
2. Does not depend on arguments other than its own argument
3. Does not mutate values outside of its scope

Pure function is out of this article's scope, but check this [short article on pure function](https://blog.bitsrc.io/understanding-javascript-mutation-and-pure-functions-7231cc2180d3?gi=56dfa64da56e).

# Other notes

Memoization is awesome. But let's not overuse it. Some things to consider when deciding when to use memoization:

1. Not all functions are memoizable. Only pure functions are.
2. Memoizations have high overhead. Remember, we have to create a cache to store many possible arguments for every memoized function.
3. Memoization is best used on expensive function. Regex calls and recursions are some of them that came into my mind.

# That's nice. But we probably would never use Fibonacci in real life. Is there an example of real life use of memoization?

Yup. [VueJS](https://vuejs.org/) utilizes memoization. `cached(fn)` is a memoization wrapper.

```
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}
```

And it is being used several times:

```
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
```

You can find these function [here](https://github.com/vuejs/vue/blob/dev/src/shared/util.js). (Vue 2.5.0 at the moment of this writing. It might change in the future but you could always go back to previous version).

Happy hacking!

# Resources

More readings on memoziation:
- [Understanding JavaScript Memoization In 3 Minutes](https://codeburst.io/understanding-memoization-in-3-minutes-2e58daf33a19)
- [JavaScript Function Memoization
](http://inlehmansterms.net/2015/03/01/javascript-memoization/)
- [Implementing Memoization in Javascript](https://www.sitepoint.com/implementing-memoization-in-javascript/)

On pure function:
- [Understanding Javascript Mutation and Pure Functions
](https://blog.bitsrc.io/understanding-javascript-mutation-and-pure-functions-7231cc2180d3)