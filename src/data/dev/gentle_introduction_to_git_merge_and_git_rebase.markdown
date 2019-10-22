---
title: Gentle introduction to git merge and git rebase
published: true
description: differences between git merge and git rebase
tags: git, merge, rebase, source-control
---

One of my biggest weakness in programming is using git. There were times when I thought I might accidentally remove the file I have been working on because I didn't know what I was doing.

One common use of git is applying feature branch into master branch. I want to go over two popular commands: `git rebase` and `git merge`, in the most gentle way possible. Hopefully at the end of this article, you'll understand what each of them does and why they differ.

# Getting started

Let's code along with me (this shouldn't require you to actually create a new project in github). Create a directory and create an empty git repository.

```
mkdir git-playground && cd $_
git init
```

Create a txt file, pretend that will be the file everyone will be working on.

```
touch main.txt
echo "master1" >> main.txt
```

This will be our first commit, let's commit it with the same commit name so we can distinguish it.

```
git add .
git commit -m "master1"
```

Check our git log, we should see only one thing, our "master1" commit.

```
git log
```

Pretend another work is done on master branch the same file! Let's add another content. Add that change and commit it.

```
echo "master2" >> main.txt
less main.txt // should say "master1" and "master2"
git commit -am "master2" // git add and commit at the same time
```

Up to this point, everything has been pretty linear. Then one day our boss asks us to work on a feature separately. We create a new branch and work on our feature there. Later it will applied back to master.

```
git checkout -b feature1
```

Our feature work will be to update `main.txt`

```
echo "feature1" >> main.txt
git commit -am "feature1"
```

Upon git logging, you will see 3 items:

```
commit 9238fc8a51ca9ba07716218c8c70ad1747488240
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:43:24 2019 -0500

    feature1

commit b1c6125495497dc36310501d4decebf8d3690bd5
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:39:42 2019 -0500

    master2

commit d0a5a8847025736fbf8903ba517b71e9c1c3cfed
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:37:37 2019 -0500

    master1
```

Let's pretend at the same time we are working on feature, someone else worked on another feature and pushed it to master.

Go back to master branch.

```
git checkout master
echo "master3" >> main.txt
git commit -am "master3"
```

Inside the file, you should see

```
master1
master2
master3
```

Note: since we switched branch, all our work in feature branch remains in feature branch. 

If we check git log:
```
commit fbf7329cc6be6e1e44527e5ed5749adfe14b9ebf
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:47:54 2019 -0500

    master3

commit b1c6125495497dc36310501d4decebf8d3690bd5
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:39:42 2019 -0500

    master2

commit d0a5a8847025736fbf8903ba517b71e9c1c3cfed
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:37:37 2019 -0500

    master1
```

Our feature work is ready to be applied to master, but... what is the best way to bring together our feature work into master branch in this case?

We can do it with either git merge and git rebase. Let's go through each together.

![our state now](https://thepracticaldev.s3.amazonaws.com/i/rsj4zl6dxnsbdfajwhgw.png)

# Git merge

Let's go back to master branch and merge feature branch.

```
git checkout master
git merge feature1
```

Oops, we have a conflict. Git looks at the change history and found that both `master` and `feature1` branch each implements a change at the same location. It isn't sure what to do with this same change.

Let's fix it. Go to `main.txt`, you should see this:

```
master1
master2
<<<<<<< HEAD
master3
=======
feature1
>>>>>>> feature-branch
```

Everything between "<<<<<<< HEAD" and "=======" are coming from our [current checked-out branch](http://researchhubs.com/post/computing/git/what-is-HEAD-in-git.html) and everything that is between "=======" and ">>>>>>> feature-branch" are all  incoming work.

Btw, other works that aren't conflicting are automatically applied by git. So if we had made changes in other files and they don't conflict, those changes will be applied to master branch automatically.

We want our feature works to be after master3, let's clean it up to look like this:

```
master1
master2
master3
feature1
```

Save then `git add .`, then do `git commit`. You'll see a `"COMMIT_EDITING"` window with its default text being `"Merge branch 'feature1'"`. You can change them to whatever you want or leave it as default (`:wq`). This will be the commit message for merging.

When you git log, you'll see:

```
commit 623f8868826b6622b62d8d2949ce26ff79463621
Merge: fbf7329 9238fc8
Author: Iggy <igoririanto@rocketmail.com>
Date:   Fri Sep 13 07:42:54 2019 -0500

    Merge branch 'feature1'

commit fbf7329cc6be6e1e44527e5ed5749adfe14b9ebf
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:47:54 2019 -0500

    master3

commit 9238fc8a51ca9ba07716218c8c70ad1747488240
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:43:24 2019 -0500

    feature1

commit b1c6125495497dc36310501d4decebf8d3690bd5
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:39:42 2019 -0500

    master2

commit d0a5a8847025736fbf8903ba517b71e9c1c3cfed
Author: Iggy <igoririanto@rocketmail.com>
Date:   Thu Sep 12 07:37:37 2019 -0500

    master1
```

One thing you'll notice, although we technically have 4 commits: "master1, master2, master3, feature1", git considers the act of merging branches as a commit in itself. That's why whenever you run a git merge, you'll see an additional commit (usually called "Merge branch 'X-BRANCH'").

From [docs](https://git-scm.com/docs/git-merge), git merge "incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch"

The important thing here is "since the time their histories diverged". Git looks back at the point where their histories diverged, which is master2. It diffs for all changes applied since then (the word "master3" in master branch and the word "feature1" in feature branch). Git finds these two changes and tries to put them together (auto-merge). Since they are changes in the same spot, git is conflicted (pun intended). 

However, if we had made a change in a new folder inside our feature1 branch, git would apply ALL new changes. This [SO post](https://stackoverflow.com/questions/14961255/how-does-git-merge-work-in-details) is super helpful to give high-level overview of git-merge. 

Other readings on git merge:

- [how to use git merge the correct way](https://dev.to/neshaz/how-to-use-git-merge-the-correctway-25pd)
- [git merging what happens to the merged branch](https://stackoverflow.com/questions/39848521/git-merging-what-happens-to-the-merged-branch)


# Git rebase

Let's rewind to the point where we have feature1 work in feature-branch and master3 in master branch (right before "Git Merge" section above). Make sure we are inside feature branch.

```
git checkout feature-branch
git rebase master
```

We will see a conflict. Remember, we added "feature1" in the same place as "master3". We will need to fix that.

Btw, if you git log now you'll see:

```
commit b71640c9c9440e3a728f299d7c53889d7d02e101
Author: Iggy <igoririanto@rocketmail.com>
Date:   Sat Sep 14 09:49:00 2019 -0500

    master3

commit 3272efa79a998460a8a19aacbc8ed9e1333eca06
Author: Iggy <igoririanto@rocketmail.com>
Date:   Sat Sep 14 09:47:54 2019 -0500

    master2

commit ad41707299da77d711204226c5c4e3b2f4b37869
Author: Iggy <igoririanto@rocketmail.com>
Date:   Sat Sep 14 09:47:41 2019 -0500

    master1
```

Here is what's inside main.txt:

```
master1
master2
<<<<<<< HEAD
master3
=======
feature1
>>>>>>> feature1
```

We want our feature to be after master3, so clean it up:

```
master1
master2
master3
feature1
```

Once everything is cleaned up, add the changes and continue rebase

```
git add .
git rebase --continue
```

If we do git log, you'll see that the history is lined up nicely:

```
commit a5b2d0a963a29bf68f7654279b8979e7a08e08f3
Author: Iggy <igoririanto@rocketmail.com>
Date:   Sat Sep 14 09:48:32 2019 -0500

    feature1

commit b71640c9c9440e3a728f299d7c53889d7d02e101
Author: Iggy <igoririanto@rocketmail.com>
Date:   Sat Sep 14 09:49:00 2019 -0500

    master3

commit 3272efa79a998460a8a19aacbc8ed9e1333eca06
Author: Iggy <igoririanto@rocketmail.com>
Date:   Sat Sep 14 09:47:54 2019 -0500

    master2

commit ad41707299da77d711204226c5c4e3b2f4b37869
Author: Iggy <igoririanto@rocketmail.com>
Date:   Sat Sep 14 09:47:41 2019 -0500

    master1
```

However, we are still inside feature branch. Do `git checkout master` - we see that we don't have feature1 change yet. We rebased feature against master, but not master against feature yet. Let's rebase master against feature branch.

```
git rebase feature-branch
```

It should rebase without conflict since we cleaned up the conflict earlier. If you check `git log` and `less main.txt`, you will see all the feature branch changes. Congratulations! You have rebased successfully!


Ok, by now you might ask - what just happened? Why are we rebasing two times? 

The first time we rebase (when we are in feature branch and we run `git rebase master`), git rebase looks for a common "base" between feature branch and master. By common base, I mean common commit. In this case, our common commit is `"master2"` commit. It also finds that master has "master3" that feature branch does not have. 

Then it makes "master3" instead of "master2" our feature branch's new base (*hence the word rebase*). After making "master3" our new base, all changes done in feature branch is applied on top of new base. That's why on git log we see master1 -> master2 -> master3 -> feature1. This is the first rebase.

When we check out master branch after rebasing, we run `git rebase feature1`. Git searches for common base between master and feature branch and finds that master3 is the common branch, cool! Since both branches share the same base, master is not rebased. However, it finds that feature has commits that are not in master, so it applies feature1 into master.

Resources on git rebase: 
- [git-rebase](https://git-scm.com/docs/git-rebase)

And that's it! Our master now successfully rebased with our feature changes. 

![everything is linear](https://thepracticaldev.s3.amazonaws.com/i/x16oe8ox92k1n1qslp16.png)

# Should I merge or rebase?

Now the question is, what do we use? The answer is, as always, *depends*.

Just remember these things: 

Git merge generates a commit while merging and preserves all history. It is messier but makes things traceable (we can tell when a merge is done from history). What we did is readable because there were not a lot going on, but imagine a team of 30-50 developers doing daily merges. 

Git rebase is a lot cleaner, but hard to trace things back because it rewrites history (if you see git log after what we just did, it's hard to tell that a rebase just happened).


Yet more resources: 

- [git rebase](https://www.atlassian.com/git/tutorials/rewriting-history/git-rebase)
- [the git rebase introduction I wish I'd had](https://dev.to/maxwell_dev/the-git-rebase-introduction-i-wish-id-had)

If you find a mistake, please feel free to let me know in the comments. I appreciate you guys reading this far. Happy coding all!