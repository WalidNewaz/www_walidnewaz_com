---
featured: false
date: "2024-01-03"

series: "Building a Blog Feedback System"
part: "II. No-Code and Low-Code Prototyping"
chapter: "3. Adding Discussions with Giscus or Disqus"

title: "Adding Discussions with Giscus or Disqus"
description: "No-code prototype using Airtable gives you a fast feedback loop without writing a single line of backend code."
has_quiz: true
tags: ["Discussions", "Blog", "Web Dev"]
---

# Chapter 3: Adding Discussions with Giscus or Disqus

While Airtable buttons are great for quick binary feedback, sometimes readers need **space to discuss**, ask questions, or leave detailed comments. That’s where **discussion systems** come in.

In this chapter, we’ll:

* Learn the differences between **Giscus** and **Disqus**.
* Build a working integration using **Markdown HTML embeds**.
* Grow by adding a **Gatsby component** for React-based blogs.

## 3.1 Giscus vs. Disqus

| Feature    | Giscus (GitHub Discussions)      | Disqus (Hosted)                |
| ---------- | -------------------------------- | ------------------------------ |
| Ownership  | GitHub Discussions in your repo  | Disqus (external service)      |
| Free tier  | Free (requires GitHub login)     | Free (ads unless you pay)      |
| SSO / Auth | GitHub account required          | Built-in login / SSO options   |
| SEO        | Indexed by GitHub                | SEO-friendly (hosted pages)    |
| Embedding  | Lightweight JS script            | Embed `<div>` + script         |
| Best for   | Dev blogs with technical readers | General blogs, wider audiences |

**Rule of thumb:**

* If your audience already uses GitHub → use **Giscus**.
* If you want universal login (Google, Facebook, etc.) → use **Disqus**.

## 2.2 Markdown & HTML Embed

### Giscus Embed

Before you can use Giscus for discussion on your site, you’ll need to configure your GitHub Discussions (instructions in <a href="https://giscus.app/" target="_blank">Giscus docs</a>).

Set up the following according to the instructions:
- Repository
- Page ↔️ Discussions Mapping
- Discussion Category
- Features
- Theme

#### Enable giscus

Add this snippet to your blog post template (Markdown allows raw HTML):

```html
<script src="https://giscus.app/client.js"
        data-repo="yourusername/yourrepo"
        data-repo-id="YOUR_REPO_ID"
        data-category="General"
        data-category-id="YOUR_CATEGORY_ID"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang="en"
        crossorigin="anonymous"
        async>
</script>
<noscript>Please enable JavaScript to view the comments powered by Giscus.</noscript>
```

> **Note**: Giscus will fill in the correct values for the variables, and generate the appropriate source. However, we will be using the <a href="https://github.com/giscus/giscus-component" target="_blank">pre-built Giscus components</a> within our React site.

#### Giscus React Component

Install the component:

```bash
npm i @giscus/react
```

Import the default export from the package:

```javascript
import Giscus from '@giscus/react';

export default function MyApp() {
  return (
    <Giscus
      id="comments"
      repo="giscus/giscus-component"
      repoId="MDEwOlJlcG9zaXRvcnkzOTEzMTMwMjA="
      category="Announcements"
      categoryId="DIC_kwDOF1L2fM4B-hVS"
      mapping="specific"
      term="Welcome to @giscus/react component!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang="en"
      loading="lazy"
    />
  );
}
```

Replace the prop values using the values from the earlier example.

### Disqus Embed

Sign up with Disqus. From the main menu, click `Add Disqus To Site`. Select the platform. For now we're going to select the `Universal Code`.

Disqus works with a `<div>` + script:

```html
<div id="disqus_thread"></div>
<script>
var disqus_config = function () {
  this.page.url = window.location.href;
  this.page.identifier = document.title;
};
(function() {
  var d = document, s = d.createElement('script');
  s.src = 'https://YOUR_DISQUS_SHORTNAME.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
```

Replace `YOUR_DISQUS_SHORTNAME` with the value from your Disqus dashboard.

#### Disqus React Component

Install the component:

```bash
$ npm install --save disqus-react
```

Import the component on your page:

```javascript
import { DiscussionEmbed } from 'disqus-react';

<DiscussionEmbed
    shortname='YOUR_DISQUS_SHORTNAME'
    config={
        {
            url: this.props.article.url,
            identifier: this.props.article.id,
            title: this.props.article.title,
            language: 'zh_TW' //e.g. for Traditional Chinese (Taiwan)
        }
    }
/>
```

`Disqus` is more feature reach compared to `Giscus`, however it doesn't generally offer a free tier without ads.
