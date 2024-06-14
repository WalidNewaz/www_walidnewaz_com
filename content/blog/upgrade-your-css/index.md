---
featured: false
date: "2023-06-01"
title: "Upgrade your CSS!"
description: Boosting Performance, Enhancing Design, and Streamlining Development with Advanced CSS Techniques.
hero_image: "html-css.jpg"
tags: ['web dev', 'css']
read_time: 12 min
---

# Upgrade your CSS

When it comes to creating the visual appeal of a website and its components, developers often turn to design frameworks like Bootstrap, Material, Tailwind CSS, UIKit, and others. These frameworks offer tremendous benefits in terms of simplifying and accelerating the development process, while also generating highly optimized CSS for production. However, it's important to delve deeper into the inner workings of these frameworks to truly appreciate the magic they bring.

CSS has evolved significantly from its humble beginnings in the early 2000s, where simple divs and floats were the norm. In this article, I'll shed light on some of the exciting new features of CSS that I've discovered while implementing a responsive design for this website. By exploring these advancements, we can gain a deeper understanding of the power and potential that CSS holds in shaping modern web experiences.

## Variables

CSS variables, denoted by the prefix `--`, are a powerful feature known as custom properties (`--*`). They provide a convenient way to define reusable values throughout your CSS codebase. Let's take a closer look at how they work and the benefits they bring.

For instance, you can define a custom property for a brand color using a variable like `--brand` and assign it a specific value, such as `#124536`. To make this variable accessible to all elements in the document, you can define it within the `:root` pseudo-selector, which represents the root element of the document:

```css
:root {
  --brand: gold;
}
```

Once defined, you can utilize the variable to apply consistent styling to elements. In the example below, we're setting the background color of a section element using the `--brand` variable:

```css
section {
  background-color: var(--brand);
}
```

By employing CSS variables, you can centrally control the color scheme and layout parameters of your website, rather than hard-coding them for each individual element. This approach promotes consistency, scalability, and easier maintenance, as modifications can be made in a single place and automatically cascade to all elements utilizing the variable.

In summary, CSS variables offer a flexible and efficient way to manage styles across your project, enabling you to create a harmonious and easily maintainable design system.

## Functions

CSS value functions are powerful tools that process data and provide computed values that can be used across various CSS properties. These functions enhance the flexibility and expressiveness of your styles. Let's explore two particularly useful value functions: `var()` and `calc()`.

The `var()` function enables you to reference a variable that was declared earlier, promoting reusability and consistency. As mentioned earlier, here's an example of how `var()` can be utilized:

```css
.section {
  background-color: var(--brand);
}
```

By referencing the `--brand` variable, you can easily apply the same brand color to multiple elements, ensuring a cohesive visual identity.

The `calc()` function allows you to perform mathematical calculations to dynamically compute property values. It's incredibly handy when you need to adjust measurements based on specific requirements. For instance, consider the following example:

```css
.box {
  width: calc(var(--width-small) + 2rem);
}
```

In this case, the width property is calculated by adding the value of the `--width-small` variable with an additional `2rem`. This flexible calculation enables responsive design and adaptable layouts.

By leveraging these CSS value functions, you gain greater control and efficiency in styling your web pages. They enable you to create dynamic, reusable, and adaptable styles that enhance both the appearance and functionality of your site.

## At-rules

At-rules are powerful instructions that direct the behavior of the CSS engine, and they start with the @ sign. Let's explore three commonly used and highly beneficial at-rules: `@import`, `@media`, and `@font-face`.

The `@import` rule enables you to include external stylesheets, bringing organization and modularity to your CSS. Instead of having one massive stylesheet that becomes challenging to navigate, you can create a collection of smaller stylesheets and import them as needed. This approach improves code maintainability and makes your stylesheets more manageable.

When it comes to building responsive websites that adapt to different screen sizes, resolutions, and user preferences, the `@media` rule is your go-to tool. It allows you to apply specific stylesheets based on the result of one or more media queries. By utilizing media queries, you can tailor the presentation of your site to provide an optimal user experience across various devices and platforms. It's a key technique for creating visually pleasing and responsive designs that gracefully adapt to different mediums.

Another essential at-rule is `@font-face`, which empowers you to specify custom fonts for displaying text on your website. This is particularly important when working with web fonts. By using `@font-face`, you can incorporate unique and visually appealing typography that aligns with your design vision. This opens up a world of creative possibilities and ensures consistent and engaging text display across different browsers and devices.

## Responsive design

Responsive design is an essential approach that ensures your website looks fantastic for everyone, regardless of the device they're using. It involves tailoring the presentation and behavior of your site to accommodate different devices and user preferences.

To achieve this, there are key concepts and techniques to explore. Media queries play a central role in responsive design. They allow you to apply specific styles and adapt the layout based on factors like screen size, resolution, and orientation. By leveraging media queries effectively, you can create a seamless and enjoyable user experience across a wide range of devices.

Layout management is another crucial aspect. Techniques like Flexbox and Grid provide powerful tools for structuring and arranging elements on the page. They offer flexible and responsive layout capabilities, making it easier to create visually appealing designs that adapt gracefully to different screen sizes.

Theming is an exciting area within responsive design, as it allows you to customize the visual style of your site. By implementing themes, you can change color schemes, typography, and other design elements, making it possible to create different visual experiences for various user preferences or branding requirements.

Accessibility is a fundamental consideration in responsive design. By ensuring your site is accessible to all users, including those with disabilities, you create an inclusive and user-friendly experience. Paying attention to accessibility guidelines and best practices helps you reach a broader audience and demonstrate a commitment to user-centered design.

In the <a href="https://web.dev/learn/design/" target="_blank">Responsive Design tutorial</a>, you'll find a step-by-step guide that dives deeper into these concepts and provides practical techniques for implementing responsive design effectively. It's a valuable resource that will equip you with the knowledge and skills needed to create visually stunning and user-friendly websites that adapt seamlessly across devices.

## Web fonts

Web fonts open up a world of possibilities when it comes to adding style and personality to your website. Gone are the days of being limited to default fonts on devices. With web fonts, you can now incorporate exquisite typefaces that enhance menus, banners, headings, and more.

To utilize a custom web font, you'll need to load it onto your web page. This can be done by using a `<link>` element that references the font file. Once the font is loaded, you can apply it to specific HTML elements using the powerful `@font-face` property.
For example, if you want to use the "`Playfair`" font for your heading elements, you can define it like this:

```css
h3 {
  font-family: "Playfair", Times, serif;
}
```

This will ensure that the "`Playfair`" font is applied to all `<h3>` headings, creating a unique and visually appealing typography style.

There's a <a href="https://fonts.google.com/knowledge/using_type/using_web_fonts" target="_blank">comprehensive tutorial</a> available that guides you through the process of loading web fonts onto your website. It provides detailed instructions and valuable insights to help you make the most of this exciting feature.

## Utility classes

When it comes to styling elements on a web page or within a component, we've traditionally relied on id, class, or element selectors to apply CSS properties to our desired items. However, there's a faster and more efficient approach that allows us to incrementally add or remove specific CSS style properties, such as border-width, padding, or opacity. It involves creating named classes that are tied to individual CSS properties and values.

For example, let's say we have the following classes defined:

```css
.italic {
  font-style: italic;
}
.bold {
  font-weight: 600;
}
.upper {
  text-transform: uppercase;
}
```

By combining these classes, we can achieve our desired styles without creating new CSS rules for each element. We can simply layer the classes onto the element to apply the styles we want. For instance:

```html
<p class="italic">Today was a <span class="bold upper">good</span> day.</p>
```

In this example, the text "good" is rendered in italics, with bold weight, and transformed to uppercase. By utilizing these reusable classes, we can easily combine them in various ways to achieve effective and flexible styling without duplicating CSS code.

If you're intrigued by this system of design, I recommend exploring the detailed resources available on the <a href="https://designsystem.digital.gov/utilities/" target="_blank">USWDS site</a>. They delve into this approach, providing valuable insights and guidelines for creating efficient and modular CSS designs.

## Theming

When it comes to theming, a simple yet effective approach is to select a few colors from a color palette. For this particular site, I've chosen `DarkGreen` as the primary color, `gold` as the secondary color, and `black` to complement various shades of text.

To create a comprehensive color palette, I've converted the primary colors into the HSL (`hue`, `saturation`, `lightness`) format. By doing so, I can maintain a consistent hue while adjusting the saturation and lightness values to generate intermediate colors for different elements. The following is an example of how the primary brand color (Dark Green) is altered for “dark mode” presentation.

```css
--brand-dark: hsl(var(--brand-primary-hue) calc(var(--brand-primary-saturation) / 2) calc(var(--brand-primary-lightness) / 1.5));
```

To ensure a cohesive visual experience, I've developed two sets of color palettes—one for the light mode and another for the dark mode. Each palette follows the same underlying principles, but the specific values are tailored to create distinct aesthetics for each mode. The process of creating these palettes is thoroughly explained in a tutorial, which provides detailed insights into achieving harmonious color schemes.

By employing this approach, you can establish a unified and visually pleasing theme for your site. By carefully selecting and manipulating colors, you can create a sense of cohesion and enhance the overall user experience. To delve deeper into the intricacies of this process and gain a deeper understanding of color theory, I encourage you to explore this <a href="https://web.dev/building-a-color-scheme/" target="_blank">tutorial</a>.

## Dark mode

In today's digital landscape, it's becoming increasingly common for websites and web applications, including this one, to offer a dark theme option. This feature caters to users who prefer a darker backdrop for their browsing experience, especially in low-light environments. The allure of a dark theme lies in its enhanced visual appeal and improved readability under such conditions.

To bring this dark theme to life, you'll need to create a specialized color palette that can be applied when the user opts for the dark mode. Typically, this color palette consists of a set of variables that define the desired colors for different elements throughout the site. By dynamically adjusting the values of these CSS variables, you can effortlessly switch between light and dark modes without the need for complex scripting.
Let's take a look at a sample dark mode theme file as an example (`dark.css`):

```css
:root {
  --brand-dark: hsl(var(--brand-primary-hue), calc(var(--brand-primary-saturation) / 2), calc(var(--brand-primary-lightness) / 1.5));
  ...
}
html {
  color-scheme: dark;
  --brand: var(--brand-dark);
  ...
}
```

In the above code snippet, the `:root` selector defines the custom CSS variables, such as `--brand-dark`, which determines the color for elements in the dark mode. The `html` selector is used to set the `color-scheme` property to `dark`, indicating that the page should adhere to the dark mode color scheme. Additionally, the `--brand` variable is set to `var(--brand-dark)`, ensuring that the appropriate color is applied to elements throughout the site.

To instruct the browser to load the appropriate theme based on the user's preference, you can include a `<link>` tag with a `media` attribute in your HTML:

```html
<link rel="stylesheet" href="/dark.css" media="(prefers-color-scheme: dark)" />
```

The above `<link>` tag specifies a separate CSS file, `dark.css`, to be loaded when the user's preferred color scheme is set to dark. This way, the browser automatically selects and applies the appropriate theme based on the user's settings.

For further exploration and alternative approaches to achieving the same outcome, I recommend referring to additional resources available <a href="https://web.dev/color-scheme/" target="_blank">here</a>. These resources provide further insights and techniques to help you implement and customize dark themes to suit your specific needs.

## In closing

These are just a few examples of how CSS goes beyond its traditional role of styling web pages. By harnessing the power of SVG manipulation, GPU-accelerated animations, and creative filter effects, you can unlock a whole new level of visual richness and interactivity in your web projects.

So, don't hesitate to explore the incredible possibilities that CSS offers beyond the surface. Experiment with SVG graphics, unleash the power of GPU-powered animations, and dive into the world of creative filters. With CSS, you have the tools to transform your web experiences into captivating and visually engaging journeys for your users.

## References

The following sites helped me with the understanding of the features I’d highlighted here:

1.  <a href="https://web.dev/learn/css/" target="_blank">Learn CSS</a> - An introductory, but detailed walk through of the essential features of modern CSS.
2.  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS" target="_blank">CSS: Cascading Style Sheets</a> - An authoritative source of information regarding all things CSS.
3.  <a href="https://css-tricks.com/" target="_blank">CSS-Tricks</a> - Many useful articles about CSS features from experts.
4.  <a href="https://web.dev/building-a-color-scheme/" target="_blank">Building a color scheme</a>.
5.  <a href="https://web.dev/color-scheme/" target="_blank">Improving dark mode default styling with the color-scheme CSS property and the corresponding meta tag</a>.
6.  <a href="https://designsystem.digital.gov/utilities/" target="_blank">Utilities</a> - U.S. Web Design System.
