---
title: Deciding What Button To Add To My Site
published_at: 2019-12-28
description: How I come up with new navigation button on my site
---

I recently updated the buttons on my blogs. Creating the buttons weren't hard, but the process of deciding where they go, what they should look like, and what they should do is. Here I am going to share my design process. I hope to impart to you guys my design process thinking

# Deciding what kind of User Experience I want to provide

It is good to have a goal for my readers. I came up with two:

1. To provide minimal distraction so user can focus on page content.
2. To provide ease navigating around so user can focus on page content

I want a subtle helper that does not take away from the content. *Its main thing is to keep its main thing the main thing: the content.*


# Current Design

This is the current site
![Current site - it only has bulb](https://firebasestorage.googleapis.com/v0/b/archer-import.appspot.com/o/blogs%2F2019%2F12%2F28%2Firiancurrent.png?alt=media&token=389ba3aa-f7ba-42a4-a878-468aefb3180b)

What is it lacking? I can come up with infinite list, but two stood out: button to go to previous page and button to scroll to top.

There are other features that I'd like to add like: bookmarks, highlights, note-taking, etc. Those might come later, but for MVP, I decided that the easiest, most important features are the ability to go back and scroll up.

# Inspiration

I started by researching other sites I think have good design for design problem I am facing. Here are some:

[Exo docs](https://hexdocs.pm/exo/Exo.html)
![exo docs screenshot](https://firebasestorage.googleapis.com/v0/b/archer-import.appspot.com/o/blogs%2F2019%2F12%2F28%2Finspiration-exo.png?alt=media&token=f2180129-f313-4984-9b80-bc5d8e846cd0)

[Vue docs](https://vuejs.org/v2/guide/)
![vue docs screenshot](https://firebasestorage.googleapis.com/v0/b/archer-import.appspot.com/o/blogs%2F2019%2F12%2F28%2Finspiration-vue.png?alt=media&token=3578d33b-3bbd-493e-9748-685922d396ff)

[patdryburgh](https://patdryburgh.com/)
![pat blog screenshot](https://firebasestorage.googleapis.com/v0/b/archer-import.appspot.com/o/blogs%2F2019%2F12%2F28%2Finspiration-pat.png?alt=media&token=088e6717-5985-4c70-8d08-197522542aaf)

[xomisse](https://xomisse.com/blog/add-a-scroll-back-to-top-button-to-blogger/)
![xomisse blog](https://firebasestorage.googleapis.com/v0/b/archer-import.appspot.com/o/blogs%2F2019%2F12%2F28%2Finspiration-xomisse.png?alt=media&token=c9bb772a-8108-494d-b303-9922340c8dd3)


Some things that stood out:
- I really liked xomisse's scrollTop button. It is minimalistic and not distracting. The only thing that can be improved is positioning. At the moment it overlaps some of the texts
- I liked the hexdocs' implementation of left and right sidebars. They are unintrusive and yet very useful.
- I also liked Pat's top right navs (dark mode and search). But for the time being, I am not implementing them - so I will keep that as a reference for later.

# Synthesizing Ideas

From inspirations, I decided on three things: dark-mode, back arrow, and scrollTop arrow. I also decided to put them in the bottom so they won't interfere with most people's [F-shaped reading pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/).

This is what I came up with. Note the two buttons on bottom left:

![result with two sidebar arrows](https://firebasestorage.googleapis.com/v0/b/archer-import.appspot.com/o/blogs%2F2019%2F12%2F28%2Fresult-twoarrows.png?alt=media&token=e8f0e138-9dfa-4224-a94d-d4b8fc771fa3)

I will skip the coding part here because my intention is to share design process, not coding process. I use [vuejs](https://vuejs.org/) for my frontend needs and it has been super awesome.

# Attempt 2

After letting it sit for a day, I decided to take the left arrow out.

Why, you ask?

Because my main goal is simplicity. The less there is on the screen, the more user can focus on content.

1. Browsers have back button already. Why should I add another button to do same thing all major browsers already do?
2. Adding extra button adds slight cognitive load to user. More cognitive load = less cognitive capacity for users to focus on articles.
3. Slashing out one of the buttons actually added an element of symmetry. Now we are left with one button on each sides. Symmetry is good.

# Final design

This is the final design.

![Final result](https://firebasestorage.googleapis.com/v0/b/archer-import.appspot.com/o/blogs%2F2019%2F12%2F28%2Ffinalresult.png?alt=media&token=4bc35057-c590-427d-80f5-7bdac367b3a3)

I think it accomplish what I intended to do in the beginning: to help user consume content with least distraction.
