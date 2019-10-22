---
title: VIM: quick tips to do search better
published: true
description: vim searching tips
tags: vim, search, regex, patterns
cover_image: https://thepracticaldev.s3.amazonaws.com/i/3715kym7oqoe9f00x716.png
---

Being able to search for complicated patterns quickly is an indispensable skill as a developer. I want to share some tips to use Vim's search to speed up your development. When used correctly, search can be a powerful navigation tool in Vim.

I hope you'll learn one or two things!

![happy fast typing](https://media.giphy.com/media/Wsju5zAb5kcOfxJV9i/giphy.gif)

# Searching in Vim

You can search using `/{your-search-pattern}`. Go backwards with `?{your-search-pattern}`. To search for all `foo` in a file, do `/foo`.

# Finding next/ previous instance

Once you enter your search pattern `/foo`, pressing Enter (`<CR>`) will put you into what I  call "search mode". You can find next instance of "foo" by `n` and previous instance of "foo" by `N`.

One super convenient thing about `n` is that you can do it **anytime** even when you are not in search mode anymore, invoke that search again by typing `n`. Try it.

I think this is a powerful navigation tool in vim because you can quickly go up/down file with precision.

# Turn on ignorecase and smartcase

I find it easier to search in case insensitive mode. To do that, in my `vimrc` I have `set ignorecase`. With ignorecase, typing `/foo` will match "foo", "Foo", "FOO", etc.

I also have smartcase on (`set smartcase`). These two usually [go together](https://stackoverflow.com/questions/2287440/how-to-do-case-insensitive-search-in-vim).

What ignore + smartcase combo do, is that it will do case *insensitive* search only if we use all lowercase search. It will do case *sensitive* search if we use at least one uppercase.

For example:

```
foo
Foo
FoO
```

Searching `/foo` will match all of the above. Searching `/Foo` will match only "Foo". Searching `/fOo` will find no match. 

The former is case insensitive, the last two were case sensitive. A little weird, but I find it delightfully intuitive.

# Disabling highlight

After finding matches, sometimes I found the highlighted matches distracting. You can turn it off with `:noh` (no highlight). Because I use this often, I mapped `:noh` to `<esc><esc>`. 

Here is what I have in `.vimrc`:

```
nnoremap <esc><esc> :noh<return><esc>
```

# Auto complete searching

Vim is smart enough to autocomplete your search keyword. While you are searching for "something", you can autocomplete with `/somet<C-r><C-w>` gives `/something`.

It is not foolproof, but I found 90% of the time it gives me the word I was thinking of.


# Repeating last search

To repeat last search, you can do either `/` or `//`. 


# Finding word frequency

To see how many "foo" occurs in a file, you can type `:%s/foo//gn`.

It uses substitute (`:s`) command, for the whole file (`%`) but we suppresses it (`n`) (I think you can just use `:%s/{word}//n` without g.

We can combine this with `//`. If we *had just searched* for foo (`/foo`) and we wanted to find how many "foo" in current file, we can do `:%s///gn`.

# Quickly find all word instances under cursor

There are two ways to find a word under cursor:
1. To find within word boundary, use `*` or `#`
2. To find without word boundary, use `g*` or `g#`.

I didn't get word boundaries at first, so let me explain:

```
[H]ello // [H] means cursor is on H
HelloWorld
Hello
Helloworld
```
If we use `*`, we will see
```
[Hello] //highlights
HelloWorld
[Hello] //highlights
Helloworld
```

If we use `g*`, we will see

```
[Hello] //highlights
[Hello]World //highlights
[Hello] //highlights
[Hello]world //highlights
```

Use `n` or `N` to jump to next/ previous instance.

That's all for now. I hope you guys find this helpful. Please feel free to share other searching tips - I am curious to hear from you guys.

Happy hacking!!

![wayne's world thumbs up](https://media.giphy.com/media/imRu0Oqh6kzdK/giphy.gif)