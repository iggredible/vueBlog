---
title: The only two things you need to know about PATH command line
published: true
description: Quick introduction on path
tags: path, command-line, basics, linux
---

> "I was a bit challenged when I was younger to stay on the right path" - Dwayne Johnson

![dwayne](https://media.giphy.com/media/kNA1sKSqxgFDq/giphy.gif)

Such wisdom. Not all path leads to happiness. The wrong `PATH` will lead you to unhappiness. Here we will learn the right path and stay in it!

There are many things you can learn about path. I think the two important ones are:

1. Finding your path  
2. Updating your paths. 


# Finding your PATH

In mac, you can find path from command line by typing `echo $PATH`. Mine looks something like this:

```
echo $PATH
/Users/iggy/.nvm/versions/node/v10.15.1/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```

Path is colon (`:`) separated and it reads from left to right.

For example, if I execute `node`, my terminal would first search node _executable_ at (`/Users/iggy/.nvm/versions/node/v10.15.1/bin`), then (`/usr/local/bin`), etc. If node was not found anywhere, it will return ` command not found: node`.

To find which path node currently uses, run `which node`, in my case, I see:

```
/Users/iggy/.nvm/versions/node/v10.15.1/bin/node
```

Note the similarities between my one of my paths and node path:

```
#PATH
/Users/iggy/.nvm/versions/node/v10.15.1/bin 

#node path
/Users/iggy/.nvm/versions/node/v10.15.1/bin/node 
```

# Updating your path

You can either _prepend_ or _append_ your path

```
PATH=/your/new/prepend/path:$PATH
PATH=$PATH:/your/new/append/path
```

This type of change is temporary. It will disappear when the terminal is closed. To make it permanent, update path inside `.bash_profile` or `.profile`

```
export PATH="~/new/path:$PATH"
```

# Application: let's hack a path!

Suppose you are an evil person and wanted to modify the `node` command of your coworker so when they run `node`, they are running your script instead. All you need is to prepend your own path so when they run `node`, path will execute your node executable first. Here is how you can do it:

Create `/for-fun` dir, inside create a file named `node`. Make sure to add `#!/bin/bash` (shebang) on first line:

```
#!/bin/bash
echo "ALL YOUR FILES ARE GONE *EVIL LAUGHS*"
```

Save, then grant permission `chmod +x ./node`. Adding shebang and permission are required so they can run `node` directly instead of `./node`

Prepend path:

```
PATH=/Users/iggy/for-fun:$PATH
```

(replace `Users/iggy/for-fun` with whatever path you used. You can use `pwd` if you're not sure where you're at)

Check your newly appended path (`echo $PATH`) to make sure our prepend path is the first path displayed. Check also your node path (`which node`) - you should see the updated path.

Cool! Next time someone runs `node`, they'll see:

```
node
ALL YOUR FILES ARE GONE *EVIL LAUGHS*
```

That's all folks.  Happy hacking!!

