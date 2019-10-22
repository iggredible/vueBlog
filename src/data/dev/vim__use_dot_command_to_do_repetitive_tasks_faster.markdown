---
title: VIM: use dot command to do repetitive tasks faster
published: true
description: vim dot command tips
tags: vim, editor, productivity, discuss
---

Vim has been my go-to editor for the last 1.5 years, yet I am still learning something new. Recently I sought to learn about the vim's dot (`.`) command. 

Dot command is like a mini macro. Is repeats the last change made. If used correctly, it can save us time doing repetitive tasks. 

I am also curious how you guys use dot command - feel free to comment below!

# How does it work?

If you see the help section in vim (`:h .`), you'll see:

> Repeat last change, with count replaced with [count]...

I immediately thought, "what does vim mean by 'change'?"

After some reading and experimenting, I concluded change means any act of updating, adding, or subtracting the content of a file. Moving around does __not__ count as a change. Let's see if that is true by some application.

## Example 1: Adding ; to the end of each line

Here is an example ([source](https://www.reddit.com/r/ProgrammerHumor/comments/7uyafj/roses_are_red_violets_are_blue/)). Let's say we want to add `;` at the end of each line, this can be done with the help of `.`:

```
Roses are Red
Violets are Blue
Unexpected '{'
On line 32
```

Assume we are starting on top left where 'R' is. We start with `A ; <esc> j`. 
1. `A` jumps to end of line and enters insert mode. 
2. `;` adds `";"`, back to normal mode, then go down. 

Cool, that whole (`A ; <esc> j`) was one change, right? No. If we do `. . .`, we end up with

```
Roses are Red;
Violets are Blue;;; <-- what happened?
Unexpected '{'
On line 32
```
This is because vim does __not__ count `j` as part of change. Change excludes motions. In this case, vim consider a change to be `A ; <esc>`. We need to do `A ; <esc> j . j . j .`. Dot, down, dot, down, dot, down.


## Example 2: Deleting specific word, but not all

For example, suppose our poem says this instead:

```
Roses are Red Blue
Violets are Blue
Unexpected Blue '{'
On line Blue 32
```

We need to delete Blues except the one on line two. We can very quickly do it using dot command. 


`/ Blue c i w <backspace> <esc>` deletes first Blue. Then `n n . n .`

This time, our change consist of:
1. Delete the entire word Blue and entering insert mode (`c i w`)
2. Backspace while in insert mode
3. Exit

I am starting to see a pattern here. `/ Blue` and `n` are not considered change by vim, but `c i w <Backspace> <esc>` does. 

Let's do another example:

## Example 3: Adding ( at the beginning on each line

Another one, suppose you have:

```
One)
Two)
Three)
```

We are adding ( at the start of each word. You can do `I ( <esc>` to apply the change to the first, then `j . j .`. Change here is `I ( <esc>`.

## Comparing what 'changed'

Let's compare all of the repeatable changes from the past few examples:

1. `A ; <esc>`
2. `c i w <Backspace> <Esc>`
3. `I ( <esc>`

Do you see a pattern? They all _start_ with commands that put you into insert mode (c, A, and I are all command that results in entering Insert mode) and end with <esc> . 

Another one I didn't mention was delete commands like `dd`. I can delete lines repeatedly by `dd . . . .`. Although dd does not enter insert mode, vim considers it as a change because it deletes an entire line. Remember, anything that adds, removes, or updates text is considered as change by vim. 

# Application

Above are some application of dot commands. It can save us a few keystrokes - a few keystrokes saved is time gained. Next time we are doing repetitive task, see if you can repeat it with the dot command.

Thanks for reading! I really appreciate you making it this far. Happy hacking!

# Resources:

- [Practical Vim](https://www.amazon.com/Practical-Vim-Thought-Pragmatic-Programmers/dp/1934356980)
- [Why the dot (.) command is so useful in VIM?](https://stackoverflow.com/questions/7325052/why-the-dot-command-is-so-useful-in-vim)

# Discuss

I am interested to learn how other devs take advantage of the dot command. What other ways do you think dot commands can be used?

