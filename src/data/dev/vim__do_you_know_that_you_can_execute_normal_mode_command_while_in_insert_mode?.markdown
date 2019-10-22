---
title: VIM: do you know that you can execute normal mode command while in insert mode?
published: true
description: vim insert normal mode
tags: vim, productivity, insert-mode, discuss
---

Vim has been my go-to editor for the last 1.5 years, yet I am still learning something new. Recently I learned about "Insert Normal" mode and I'd like to share how you can use this mode to code faster in vim!

![typing-300wpm](https://thepracticaldev.s3.amazonaws.com/i/bz9018prk4ltg68i90tu.gif)

Feedbacks are highly appreciated. If you think of more ways to save keystrokes using this mode, feel free to share in the comments!

# What the heck is insert-normal mode?

Glad you asked! 

It is a mode in insert mode where you can execute normal mode commands. Instead of switching modes from `insert` -> `normal` -> (do normal mode stuff) -> `insert`, you can execute normal code commands while remaining in insert mode.

_All you need to do is to press **`C-o`** while in insert mode._

How can you tell that you're in insert-normal mode? In insert mode, you can see `-- INSERT --` indicator on bottom left. If we press `C-o`, it will change into `-- (insert) --`.

**Important**: you can only execute one command in this mode. After executing a normal mode command, you're back to insert mode.

Even with this limitation, this is still a powerful feature. Let's give some examples what we can do with insert-normal mode.

# Example 1: Navigating while remaining in insert mode

Let's say while typing, you wanted to add a word in the beginning of current line. Do `C-o 0` to jump to the beginning of the line, add the word, then jump back with to the end with `C-o $`. 

Maybe you are adding something after comma in the same line, just do `C-o T ,` and you'll jump right after the comma. `C-o $` to jump back to the end. 

You can always mix it with other vim motions. I find `H, M, L, [], ()` useful for quick navigation.

# Example 2: Centering screen

I am typing this article in vim. As I am typing this, I am at the bottom of the screen. I can center my current position by doing `C-o zz`.

# Example 3: Repeating characters

Say I want to type `*` 100 times. I can just type `C-o 100 i * <esc>` (the downside is, this will force you to leave insert mode).

# Example 4: Deleting faster

If I wanted to delete a block of text from my current position to an anchor, say a comma, I can just do `C-o d T ,` 

# What's next?

These are some ways we can take advantage of insert-normal mode. 

I am interested to learn how other devs can take advantage of insert-normal mode. _What other ways do you guys think insert-normal mode can be used?_

