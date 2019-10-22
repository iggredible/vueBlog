---
title: Why reading code is a habit all beginning developers should cultivate
published: true
description: Reading code helps beginning developers to grow and to become better
tags: web-development, growth, junior-developer, habit
---

![Even spidey reads books](https://subscriptions.acecomics.co.uk/wp-content/uploads/2017/07/swinging-spidey-ww-reverse.png)

A principal engineer at work shared this [article](https://www.nemil.com/on-software-engineering/read-code.html) (Notes to a Young Software Engineer — Read Code). I have read it since at least 5 times. This article, in a sense, is my response as a beginner developer (< 2 yr experience) to that article.

This post is aimed for beginning developers, but I think anyone wanting to level up their skill may equally benefit. First, I will share one of (many) takeaways from article and later I will share my action items.

# Read More Code

I am not reading enough code.

As a developer, why am I not reading other people’s codes? Writers would read and learn from other writers. Joan Didion would [type out Hemingway’s works](https://www.theparisreview.org/interviews/3439/joan-didion-the-art-of-fiction-no-71-joan-didion) to learn how he used sentences. Lincoln [read the Bible over and over](http://www.abrahamlincolnsclassroom.org/abraham-lincoln-in-depth/abraham-lincoln-and-the-bible/). Not only writers, artists also copied the work of masters. Van Gogh [copied the work of old masters](https://www.scotthyoung.com/blog/2017/10/02/how-ben-franklin-learned-to-write/) in the beginning.

Do I read other people’s code the way these great writers and artists do? Do I even bother reading the codes behind my dependencies? Do I know the main structure of React or Express? What about the internals of Rails (or whatever framework you use)?

The approach of reading code is not linear like reading a book. Nemil suggested that there are 4 steps to read code: Read, Structure, Dive, and Write (RSDW).

# RSDW
First is running the code. Before jumping into the internals of code, we need to know what it does and how it works. I think it is a good idea to learn some of its user-facing APIs.

Second is code structure. What pattern does it follow? Where is its entry point? Do you recall similar pattern with other codes you have seen?

Third is deep dive into the code. What exactly happens when a certain API is called? Does it invoke other function(s)? Is it creating/ updating/ deleting new object?

Last is to write. Write tests. Even if the library has tests, try to write my own test. Find a bug and solve it. Read the documentation, search for knowledge gap, and fill it!

# Action Items
I created 3 action items:

1. During weekdays, do at least 60 minutes of deep, intentional code reading outside of work codebase. Start with small libraries with no dependencies if possible. I would shy away from gargantuan projects like React and Rails because it would take ages to read and understand the entire library. Pick one favorite language and stick to projects within that language. I don’t think anyone can go wrong starting small and gradually growing larger.
2. Read every single line. Make sure I know what each line does. The first codebase I read took me almost four days (between work and other life obligations), but I think it is worth taking the time to fully understand. Take notes, ask questions, and try to think why it is written this way. What would happen if it was written in another way?
3. Rewrite the entire code. Even better, try to make it go lighter and faster while maintaining the same behavior. Add one feature and remove another. Write tests. At least rewriting the entire code verbatim it would still benefit in big ways.

# Conclusion

Becoming a good coder is like becoming a good writer or artist — by reading and copying the work of masters. Most people don’t spend time to read other people’s codes. Reading codebase is not a linear process like reading a book. One approach to tackle a new codebase is by doing RSDW (Read, Structure, Dive and Write). It is good for beginning coders (like myself) to find a small codebase that I am interested, read it, and rewrite it.

I read this article about 4 weeks ago and I think it is one of the best habits to develop. I am not affiliated with any of the links I mentioned in this article. I am sharing them out of pure appreciation!

Thank you for reading this all the way through! My hope is that people will benefit even in a small way by reading this and putting it into action. If you all have tips/ suggestion about some habits you think are helpful to become better developer, please feel free to share — I would love to hear! 

This article is cross-published on [medium](https://medium.com/@igor.irianto/notes-from-young-engineer-read-code-dda711255942).