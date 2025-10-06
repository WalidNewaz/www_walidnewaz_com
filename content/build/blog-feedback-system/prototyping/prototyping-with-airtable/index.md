---
featured: false
date: "2024-01-02"

series: "Building a Blog Feedback System"
part: "II. No-Code and Low-Code Prototyping"
chapter: "2. Prototyping with Airtable"

title: "Prototyping with Airtable"
description: "No-code prototype using Airtable gives you a fast feedback loop without writing a single line of backend code."
has_quiz: true
tags: ["Feedback", "Blog", "Web Dev"]
---

# Chapter 2: Prototyping with Airtable

Before jumping into code, we’ll start with a **no-code prototype** using Airtable.
This gives you a **fast feedback loop** without writing a single line of backend code.

In this chapter, we’ll:

* Learn the basics of Airtable forms and prefilled fields.
* Build a simple **“Was this helpful?” button** connected to Airtable.
* Grow by embedding Airtable results into your blog as a lightweight dashboard.

## 2.1 Why Airtable?

Airtable is a spreadsheet–database hybrid. It’s approachable like Excel, but also powerful enough to serve as a temporary backend.

**Why Airtable works well for prototyping feedback:**

* Free (with generous limits).
* Easy to set up forms.
* Supports prefilled fields (e.g., capture blog post slug automatically).
* Embeddable into blogs or static sites.
* API available if you want to grow later.

## 2.2 "Was this helpful?" Button

### Step 1 — Create Airtable Base

1. Log into <a href="https://airtable.com/" target="_blank">Airtable</a>.
2. Create a new base called **Blog Feedback**.
3. Add a table named **Feedback** with columns:
   * `Post` (Single line text)
   * `Helpful` (Single select: Yes / No)
   * `Comment` (Long text, optional)
   * `Timestamp` (Created time)

### Step 2 — Create Airtable Form

1. In the **Blog Feedback** base, click **Forms tab → New form**.
2. Ensure that the fileds: `Post`, `Helpful`, `Comment` are included.
3. Ensure that the **Feedback** is selected.
4. Click **Create form**, and the **Publish**.
5. Copy the form link (we’ll use this in the button).

### Step 3 — Add Prefilled Post Data

Airtable supports prefilled values via query parameters:

```
https://airtable.com/shrXXXXXXXX?prefill_Post=My+Blog+Post
```

If you insert the blog slug dynamically, Airtable automatically records which page the feedback came from.

### Step 4 — Embed Button in Blog

Add a button to your blog HTML/Markdown:

```html
<a href="https://airtable.com/shrXXXXXXXX?prefill_Post=Intro-to-Feedback" target="_blank">
  Was this helpful?
</a>
```

When clicked, the reader is taken to the Airtable form with the blog post prefilled.

## 2.3 Embed a Feedback Dashboard

You can embed Airtable results directly into your blog.

1. In Airtable, switch to **Grid view** of your feedback.
2. Click **Share view → Embed this view on your site**.
3. Copy the `<iframe>` embed code.

Example:

```html
<iframe class="airtable-embed" src="https://airtable.com/embed/shrYYYYYYYY"
  frameborder="0" onmousewheel="" width="100%" height="500">
</iframe>
```

Now you have a **live feedback dashboard** visible inside your blog.

## 2.4 Case Study Example

* Your blog post on **“FastAPI Basics”** now includes:
  * A **"Was this helpful?" button** that records responses in Airtable.
  * An optional **embedded dashboard** at the bottom, showing vote counts.

Within minutes, you’ve gone from **no feedback** to a **working system** without writing backend code.

## 2.5 Summary

In this chapter, you:

* Created an Airtable base for feedback.
* Built a form and prefilled blog post data.
* Embedded a **“Was this helpful?” button** into your blog.
* (Optionally) displayed live feedback with an embedded dashboard.

This is the **quick hack** stage of our journey: fast, functional, and good enough to validate the idea.

## 2.6 Exercise

1. Set up your own Airtable base and form.
2. Add a **“Was this helpful?” button** to one of your blog posts.
3. Submit feedback to test the flow.
4. (Optional) Embed the Airtable grid view at the bottom of your blog page.

## 2.7 Next Step

In the next chapter, we’ll go beyond simple yes/no feedback.
We’ll integrate **discussion systems (Giscus or Disqus)** so readers can leave richer, threaded comments on your blog posts.