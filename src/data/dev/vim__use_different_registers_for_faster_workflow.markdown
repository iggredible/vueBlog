---
title: VIM: use different registers for faster workflow
published: true
description: vim registers
tags: vim, registers, copy, paste
---


In vim, we can paste (`p`/`P`) after deleting (`d{something}`) or yanking (`y{something}`). Pasting uses Vim registers. However, do you know that there are 10 different registers in Vim? Check out `:h registers.

*I am using [neovim](https://neovim.io/) v0.3.4. Some of these might be different if you use regular vim, but the gist should be the same and most people should be able to follow along.*

In this article I will go over 3 of them because I believe these are the more useful ones (plus it's easier to learn 3 things than 10 things in one sitting). In the future, I will cover more of these registers. 


# The ten types of register

According to Vim, these are the 10 registers. The three we will cover here are shown in bold.

![boldone](https://media.giphy.com/media/27qP1RcoyDi1v9kRYZ/giphy.gif)

1. **The unnamed register ""**
2. **10 numbered registers "0 to "9**
3. The small delete register "-
4. **26 named registers "a to "z or "A to "Z**
5. three read-only registers ":, "., "%
6. alternate buffer register "#
7. the expression register "=
8. The selection registers "* and "+
9. The black hole register "_
10. Last search pattern register "/


# Some useful operators to know before we start

Some operators saves the values to registers:

`s, x, y{something}, c{something}, d{something}`

I use the mnemonic "sexy cd" - excuse my language 😳 - to remember them.

# Register 1: Unnamed registers ("")

We use them all the time. When we yank/change/delete anything we are storing them to the unnamed register (`""`).

We can use unnamed register by `p` or `""p`. 

If we do another yank/change/delete, it will replace the previous unnamed register. It is like your computer's standard copy/paste.

# Register 2: Numbered Register (0-9)

There are 2 different numbered registers: register 0 (yank register) and registers 1-9 (numbered register)

## Register 2a: Yank register (0)

When you yank something (say you just yanked an entire line `yy`), it gets saved in **two** places:

1. unnamed register (you can `p` after you `yy`)
2. yank register (`"0p`)

Yank register only gets replaced when you yank something else second time. It **won't** get replaced if you run s/x/c/d.

Yank register also won't fill out numbered registers 1-9.

This is useful when we yank an important line, that yanked line is always available even after we perform several deletions so you can call it anytime.

## Register 2b: Numbered Register (1-9)

Numbered registers store the latest 9 deletions/ changes (s/x/c/d) automatically.

Let's try it. Copy/paste the following: w

1. one
2. two
3. three
4. four
5. five // cursor here

With the cursor on the last line ("5. five"), let's do 5 `dd`.

Cool. 1-5 should be gone and saved to registers 1-5. If we want to paste three, we can just do `"3p` (read: get value from register 3 and paste it)

*Note that this register stores deleted/ changed texts **at least one line or larger**. So deleting a line (`dd`) gets stored in numbered register but deleting a word (`diw` or `de`) won't. Anything smaller gets stored in small delete (`-`) register*

## Register 3: Named register (a-z, A-Z)

Named register allows us to save our deleted/ changed/ yanked texts into register a through z. You can do it by `"{letter} {delete/yank/change action}`.

For example, if I want to delete the entire line and save that into register `a`, I can do `"add` (read: save to register a all deleted line).

To get that value back, we can do `"ap` (read: get value from register a and paste it).

If we want to append to existing register, we do `"{uppercase letter} {delete/yank/change action}`. The key is to use the uppercase letter of the letter we want to append. So to add into our register a, we can do `"Add` and use `"ap` to get the value back.

# Conclusions

We have just learned 3 Vim registers. I find that I used these 3 more than anything else. Start using them into your daily workflow today. I personally find yank registers and named registers very useful. 

That's all folks. Vim till you win!
