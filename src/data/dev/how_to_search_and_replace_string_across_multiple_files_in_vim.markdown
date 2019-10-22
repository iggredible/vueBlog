---
title: How To Search And Replace String Across Multiple Files in Vim
published: true
description: Vim search and replace multiple files
tags: vim, search, substitute, replace
cover_image: https://thepracticaldev.s3.amazonaws.com/i/9kzzlk8t7371wk98eoiv.png
---

A useful feature that popular editors like VSCode and Atom has is the ability to search and replace string across many files in a project. Wouldn't it be nice if Vim can do the same thing?

Fortunately, Vim too, is capable of doing that, although it may not be intuitive at first. The best thing is, we won't have to install any plugin to do this! I will show two ways how we can do search and replace across multiple files in Vim. But before, let's go over the fundamentals.

# Single-file search and replace (substitution)

Feel free to skip to next section if you know Vim's basic substitution.

Substitution in vim is done by:
```
:%s/stringToBeReplaced/replacementString/g
```

Regex works too. I will skip the regex details here, but you can read up more about it at `:h substitute`.

# Args

Do you know that Vim has `:ar[gs]` command that accepts a list of files?

Let me show you how we can use args. Let's assume our directory contains something like this:

```
├── index.js
├── server.js
```

To capture `index.js` and `server.js`, we can do `:args *.js`. Typing `:args` now will display

```
[index.js] server.js
```

To go to next args, type `:n[ext]` and `:prev[ious]` to go to previous args list.

We can also use glob against args to search recursively. Here are more ways you can use args:

```
:args index.js server.js // captures only index and server js files
:args **/*.js            // captures every js files
:args **                 // captures everything 
```

Armed with `:s` and `:args`, we are ready to perform our substitutions!

# Method1: Using argdo

Now that we have all args, we can perform our regular substitution. 
Recalling our substitution method, we will combine it with `argdo`.

```
:argdo %s/stringToBeReplaced/replacementString/g | update
```

This replaces ALL foo with bar and applies it to all args.

If you're baffled by argdo, you're not alone. I never heard of it until not too long ago. It is actually pretty simple. If we look at `:h argdo`, it does:

> Execute {cmd} for each file in the argument list...

In short, it apples all `{cmd}` you pass into all argument list, which is all js files. What we are passing is our substitution command.

The `update` is optional. It saves all replaced files. I do it because I usually forget to save them. 

# Method2: perform substitution with macros and repeat it

While recording a macro, perform substitution on one file, and repeat the macros across all args.

Assuming the same folder structure and args, here is how it is done:

```
qq                                          // start macro in q register
%s/stringToBeReplaced/replacementString/ge  // the e flag tells vim to not throw an error if there is no match
:wnext                                      //important. This is similar to `:next`, but it also writes the current file
q                                           // stop macro
999@q                                       //repeat this macros either 999 times or to remaining files.
```

That's it! 

*Is there another trick that you use to do global search and replace? I'd love to hear it!*

![thumbs-up](https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif)

*Btw, here's a fun part. The second method is actually listed inside Vim's "clever tricks" user manual (available for vim 7.3 and up and Neovim). If you have time, you should check out the entire section (`:h usr_12.txt`). It is fairly readable, short, and contains super fun vim hacks!!*
