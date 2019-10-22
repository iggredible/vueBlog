---
title: Scratch notes in vim
published: true
description: scratch notes in vim
tags: vim, productivity, scratch, scratch-notes
---

While coding, sometimes I need to quickly take notes to capture random thoughts. Mac's [Notes](https://support.apple.com/guide/notes/welcome/mac) used to be my default go-to app. However, wouldn't it be nice if I can take scratch notes inside Vim so it won't disrupt my flow?

Well devs, if you're wondering the same thing, you're in for a treat! Vim **has** a built-in ability to write scratch notes and here is how you can do it too!

![Taking notes](https://media.giphy.com/media/L17xM7PvLcqJggsCYa/giphy.gif)


Before we start, let's make sure we are on the same page. In my ideal world, a scratch note needs to:
1. Not be saved into our directory (otherwise we are creating new file)
2. Not get lost when hidden
3. Be quick to access

# Powered by :new

Vim's scratch note starts from `:new` command (`:vnew` works too), a command to create new window. 

Once a new window is generated, we need to add additional setups:

```
:setlocal buftype=nofile
:setlocal bufhidden=hide
:setlocal noswapfile
```

I will explain what they do:

1. setting `buftype=nofile` will tell vim that this newly-created buffer should be considered nofile type. If you noticed in buffers list (`:buffers`), originally our new file is listed as `"[No Name]"`. After adding `:setlocal buftype=nofile`, it will now be listed as `"[Scratch]"`! This means Vim categorizes any nofiles as scratch file type.

2. Adding `bufhidden=hide` will keep it persistent when the buffer is hidden. Without this setting, if your current scratch buffer gets hidden by another buffer, it will disappear... forever 😱😱!! Adding bufhidden=hide prevents this so it is accessible until we exit vim.

3. `noswapfile` prevents swapfile from being generated.

# Improvements

Although I think this capability is great, it is still not quick to access. We have to call 3 setlocals each time we generate new scratch notes. Wouldn't it be nice if we can setup our vim to automatically perform those setups?

After playing around a bit, here's an example script I came up to address that issue. Add this inside your `.vimrc`:

```
function! s:ScratchGenerator()
  echom "Creating scratchy..."
  exe "new" . "__Scratchy__"
  echom "Scratchy created!"
endfunction

function! s:ScratchMarkBuffer()
  setlocal buftype=nofile
  setlocal bufhidden=hide
  setlocal noswapfile
endfunction

autocmd BufNewFile __Scratchy__ call s:ScratchMarkBuffer()
command! Scratchy call s:ScratchGenerator()
```

What's going on here? I'll start from the end:

```
command! Scratchy call s:ScratchGenerator()
```
This adds a new command `:Scratchy`. When we invoke it, it calls ScratchGenerator function, which creates a new file named `"__Scratchy__"`.

```
autocmd BufNewFile __Scratchy__ call s:ScratchMarkBuffer()
``` 
This is an [autocommand](http://vimdoc.sourceforge.net/htmldoc/autocmd.html) that gets invoked if new buffer file (`BufNewFile`) is created *and* that buffer is named exactly `"__Scratchy__"`. 

Source your `.vimrc`. You can now create a scratch note by typing command `:Scratchy` from normal mode!

To access it even quicker, you can add shortcut. 

I like to keep it memorable, so my shortcut choice is *Ctrl+s* (for scratch). The mapping is:

```
nnoremap <C-s> :Scratchy<CR>
```

Now every time I have an itch for scratch notes (pun intended 😃), I can just press *Ctrl+s*!

Alternatively, there is a vim plugin called [`scratch.vim`](https://github.com/mtth/scratch.vim) with more feature. Experiment to create your perfect scratch note! 


That's it! Now you can scratch that off your list!

# Resources
- `:h new`, then search for "scratch" (`/scratch`)
- [scratch.vim](https://github.com/mtth/scratch.vim)
- Another, simpler [scratch.vim](https://github.com/vim-scripts/scratch.vim)