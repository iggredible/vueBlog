---
title: Quick vim tips to generate and increment numbers
published: true
description: Generate and increment numbers quickly in vim
tags: vim, productivity, tips, numbers
---

There are times when I need to either increment or generate a column of numbers quickly in vim. Vim 8/ neovim comes with useful number tricks.

![magician](https://media.giphy.com/media/KmIR3x7UG4cFy/giphy.gif)

I will share two of them here.

# Quickly generate numbers with put and range

You can quickly generate ascending numbers by

```
:put=range(1,5)
```
This will give you:

```
1
2
3
4
5
```

We can also control the increments. If we want to quickly generate descending number, we do:

```
:put=range(10,0,-1)
```

Some other variations:

```
:put=range(0,10,2) // increments by 2 from 0 to 10 
:put=range(5)      // start at 0, go up 5 times
```

This trick might be helpful to generate a list when taking notes. In vim, display current line, we can use `line('.')`. This can be combined with put/range. Let's say you are currently on line # 40. To generate numbers to line 50, you do:

```
:put=range(line(','),50)
```

And you'll get:

```
40 // prints at line 41.
41
42
43
44
45
46
47
48
49
50
```

To adjust line number above, you change it to be `:put=range(line('.')+1,50)` to show the correct line number.

# Quickly increment column of numbers

Suppose we have a column of numbers, like the 0's in HTML below:

```
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
```

If we want to increment all the zeroes (1, 2, 3, ...), we can quickly do that. Here is how:

First, move cursor to top 0 (I use `[]` to signify cursor location).

```
<div class="test">[0]</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
<div class="test">0</div>
```

Using `VISUAL BLOCK` mode (`<C-v>`), go down 8 times (`<C-v>8j`) to visually select all 0's.

```
<div class="test">[0]</div>
<div class="test">[0]</div>
<div class="test">[0]</div>
<div class="test">[0]</div>
<div class="test">[0]</div>
<div class="test">[0]</div>
<div class="test">[0]</div>
<div class="test">[0]</div>
<div class="test">[0]</div>
```

Now type `g <C-a>`. Voila!

```
<div class="test">1</div>
<div class="test">2</div>
<div class="test">3</div>
<div class="test">4</div>
<div class="test">5</div>
<div class="test">6</div>
<div class="test">7</div>
<div class="test">8</div>
<div class="test">9</div>
```

![shocked](https://media.giphy.com/media/Ki9ZNTNS7aC9q/giphy.gif)

_Wait a minute... what just happened?_

Vim 8 and neovim has a feature that automatically increment numbers with `<C-a>` (and decrement with `<C-x>`). You can check it out by going to `:help CTRL-A`.

We can also change the increments by inserting a number ahead. If we want to have `10,20,30,...` instead of `1,2,3,...`, do `10g<C-a>` instead.

_Btw, one super-cool-tips with `<C-a>` and `<C-x>` - you can increment not only numbers, but octal, hex, bin, and alpha! For me, I don't really use the first three, but I sure use alpha a lot. Alpha is fancy word for *alpha*betical characters. If we do `set nformats=alpha`, we can increments alphabets like we do numbers._

Isn't that cool or what? Please feel free to share any other number tricks with Vim in comment below. Thanks for reading! Happy vimming!