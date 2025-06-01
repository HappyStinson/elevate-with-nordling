---
title: The Future of My Personal Website
description: Reflecting on future technical features to improve the user experience
date: 2025-05-30
tags:
 - Eleventy
 - Web Development
---
I changed static site generator (again) in August 2024 and feel there has been a slow progress since. I started this project many years ago to grow both as a writer and web developer. I believe *content comes first* and tech second but there are certain technical improvements I feel would enhance the user experience. There is always a trade-off with the limited time we have to get things done in a day. This is a hobby project that I maintain in my spare time and expect it to [evolve during several years](https://blog.sharons.site/why-it-took-me-years-to-build-my-own-site/).

**Starting over** means I can bulid this from the ground-up and add features as I see a need for them. It will help me reflect on the future maintainability so I can decide which features to implement next and which ideas to let go of.

## What I want

I've believed in the notion of *Dreaming BIG* for a long time and there's really no limit to what features I could include. I reviewed my notes with the highlights from trying several different website generators and blog themes. I'm keeping this list quite focused on the most important features relevant for a *personal website with a [blog](/blog/) and project section*.

I think I’d like:

- good enough accessibility and performance
- it to use the best of modern web standards
- simplicity: minimal dependencies, easy to make technical updates
- minimal noise: I don’t want a bunch of emails and alerts from third parties
- book notes to collect information from the books I read
- more [slash pages](https://slashpages.net/)
- WebC layouts
- search via web component [<pagefind-search>](https://www.zachleat.com/web/pagefind-search/)
- a byline at the end of posts with a cute photo a short bio
- a now page where I briefly state what I'm up to now
- a search page to help you find what you are looking for
- a supporters page for information how you can help my independent writing
- a way for folks to contact me (not sure about this one)
- a way to showcase my different projects
- a landing page for my race reports/recaps
- a hero image for certain blog posts
- a way to automatically discover broken links
- an animated heart in the footer
- an "edit this page" link so anyone can suggest changes or fix my mistakes lol
- some personality in the design and content
- to be able to insert photos into content easily
- to be able to insert media embeds into content easily
- to automatically include updates from [eleventy-base-blog](https://github.com/11ty/eleventy-base-blog)
- to disable scripts for [JavaScript Naked Day](https://www.zachleat.com/web/js-naked-day/) and styles for [CSS Naked Day](https://www.zachleat.com/web/css-naked-day/)
- to update copy text on my [about](/about/) page
- to pull down data from remote APIs with eleventy-fetch

And here are a few secondary and lower-level wants:

- code snippets should look good
- images complexities handled behind the scenes
- social links and icons with redirects from subdomain. linkedin.nordling.xyz would lead to linkedin.com/in/rasmusnordling
- to use Google Analytics to track user engagement
- a favicon. This is the small image you see in the browser tab or when you save a website as a bookmark. It's a simple fix to add one but also very low priority.

## What I actually have

See my [changelog](/changelog/) where I will document the changes being made to *Elevate with Nordling*.

Why bother with a changelog? I found several good reasons that aligns with my values and here are a few of them.
1.  It gives my audience an insider’s look into how the platform or brand is **evolving**.
2.  A public changelog aligns with values of **transparency** and sharing. Inviting people to see behind the curtain builds **trust**.

### Main tech stack

- It’s a statically generated site powered by Eleventy.
- The [code](https://github.com/HappyStinson/elevate-with-nordling) is hosted on GitHub.
- I use Netlify for production builds, deployments and hosting.

I’m happy with this stack. The parts play well together, it’s free, and it brings a lot of flexibility and performance benefits.

### CMS

I use Notion to juggle my blog posts and do the initial writing before transfering it to a single markdown document. I prefer the workflow of a static site generator over platforms like Blogger and WordPress that I used in my early blogging days.

### This comes with the Eleventy blog starter

I love getting things for free and using a [starter project](https://www.11ty.dev/blog/bbv8/) instead of building from scratch means I get a lot of nice features included.

- An XML sitemap which is intended for search engines.
- Home page with an intro, and a list of latest posts.
- About page with some information about me.
- Blog archive with access to all published posts.
- 404 page with best practices when content is not found.
- Collection of pages grouped by [tags](/tags/).

### Plugins

[Plugins](https://www.11ty.dev/docs/plugins/) are a great way to extend the functionality of Eleventy. Here are the ones I have added and feel improve the user experience, weather you read with your eyes or ears. Some are dependent of JavaScript so they don't work everywhere but I'm fine with that trade-off.

- Accessible emojis for screenreaders
- Estimated reading time for blog posts
- Visual indicator how much of the post you have read

## Inspiration

> “Your job is to collect good ideas. The more good ideas you collect, the more you can choose from to be influenced by.”
― Austin Kleon, Steal Like an Artist: 10 Things Nobody Told You About Being Creative

The inspiration for writing this came from [Features of my personal website](https://fuzzylogic.me/posts/features-of-my-personal-site/) written by Laurence Hughes. I'm grateful he wrote that.

It's very likely that someone before you have already thought what you are thinking and made what you are looking for. My strategy is to combine the best ideas from different sources and put my own take on it. Here are some of my favourite websites that I drew inspiration from when brainstorming my features lists.

[Balance](https://balanceapp.com/meditation-experts/ofosu-jones-quartey), [My favorite Saturday walk on Södermalm](https://www.visitstockholm.com/see-do/attractions/my-favorite-saturday-walk-on-sodermalm/), [Theodorus Clarence](https://theodorusclarence.com/), [Florian van der Galiën uses](https://flori.dev/uses/), [Alex Hyett's Book Notes](https://www.alexhyett.com/book-notes/), [Ryan Mulligan](https://ryanmulligan.dev/), [About Rach Smith](https://rachsmith.com/about/), [Specialized 50th Anniversary](https://www.specialized.com/gb/en/specialized-50-anniversary), and [Andrew Yates](https://ay8s.com/).

<h2 lang="es">Hasta luego</h2>

I hope this was an interestsing and valuable read. I leave the link to my [project board](https://github.com/users/HappyStinson/projects/1) for those who want to get behind the curtain even more.

Thank you for reading {% emoji "❤️", "red heart" %}.
