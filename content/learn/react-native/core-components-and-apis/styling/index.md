---
featured: false
date: "2023-10-27"

series: "React Native for Web Developers"
part: "II. Core React Native Components & APIs"
chapter: "4. Styling in React Native"

title: "Styling in React Native"
description: "This chapter will show you how to style React Native apps properly."
# hero_image: "react-native-tutorial-banner-2.png"
tags: ["Styling", "React Native"]
has_quiz: true
---

# Chapter 4: Styling in React Native

You’ve now built screens, lists, and clickable components. But let’s face it—right now your app probably **looks like a wireframe**.

This chapter will show you how to **style React Native apps properly**.

We’ll cover:

* React Native styling basics
* Flexbox layouts for mobile
* Dynamic and conditional styling
* Centralized theming
* Responsive styling techniques
* Applying styles to the **Task Tracker Mobile** app

By the end of this chapter, your app will not only work but **look like a real mobile app**.

## 4.1 How Styling Works in React Native

Unlike web CSS, **React Native uses JavaScript objects for styles**.

There’s no external CSS file. No class names.

### Two main ways to style

#### 1. Inline Styles

```javascript
<View style={{ backgroundColor: 'red', padding: 10 }} />
```

#### 2. Using StyleSheet

```javascript
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
  },
});
```

**Why use StyleSheet?**

* Performance optimization
* Style validation at build time
* Cleaner code

## 4.2 Flexbox Layout in React Native

React Native uses **Flexbox by default** for layout.

| Web Flexbox                | React Native Flexbox          |
| -------------------------- | ----------------------------- |
| `display: flex;`           | Implicit (everything is flex) |
| `flex-direction: row;`     | `flexDirection: 'row'`        |
| `justify-content: center;` | `justifyContent: 'center'`    |
| `align-items: center;`     | `alignItems: 'center'`        |

### Example: Centering Content

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FlexExample() {
  return (
    <View style={styles.container}>
      <Text>Centered Content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

**Result:**
The text appears centered both vertically and horizontally.

## 4.3 Conditional and Dynamic Styling

You’ll often want to style components based on props or state.

### Example: Dynamic Background Color

```javascript
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function StatusBadge({ status }) {
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: status === 'completed' ? 'green' : 'orange' },
      ]}
    >
      <Text style={styles.text}>{status.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontSize: 12,
  },
});
```

## 4.4 Creating a Centralized Theme

Managing colors, font sizes, and spacing in one place is a **best practice for scalability**.

### File: `src/constants/Colors.js`

```javascript
export default {
  primary: '#3498db',
  secondary: '#2ecc71',
  background: '#f0f0f0',
  textPrimary: '#333333',
  textSecondary: '#777777',
};
```

### Usage Example in `TaskCard.js`:

```javascript
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    padding: 15,
    borderRadius: 8,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 18,
  },
});
```

This makes it easier to **change your app theme globally later**.

## 4.5 Responsive Styling

React Native runs on **hundreds of device sizes**, so making layouts flexible is key.

### Techniques:

| Approach                | How to Use                             |
| ----------------------- | -------------------------------------- |
| Flexbox                 | For most layouts                       |
| Percentage-based widths | For proportional elements              |
| `Dimensions` API        | Get screen size                        |
| Libraries (optional)    | E.g., `react-native-responsive-screen` |

### Example: Using `Dimensions`

```javascript
import { Dimensions, View } from 'react-native';

const screenWidth = Dimensions.get('window').width;

<View style={{ width: screenWidth * 0.9, height: 100, backgroundColor: 'pink' }} />;
```

## 4.6 Applying Styles to Task Tracker Mobile

Let’s now **revamp our TaskCard** with improved styles and theming.

### Updated `TaskCard.js`:

```javascript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

export default function TaskCard({ title, description, status }) {
  const backgroundColor = status === 'completed' ? Colors.secondary : Colors.primary;

  return (
    <TouchableOpacity>
      <View style={[styles.card, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
});
```

## 4.7 Common Styling Mistakes

| Mistake                              | Fix                                     |
| ------------------------------------ | --------------------------------------- |
| Using CSS strings (`'margin: 10px'`) | Use JS objects like `{ margin: 10 }`    |
| Forgetting units (like `px`)         | React Native uses **unit-less numbers** |
| Absolute positioning for everything  | Prefer Flexbox unless really necessary  |

## 4.8 Assignment

**✅ Task:**

1. Create a new centralized file: `/src/constants/Spacing.js`
   Example:

   ```javascript
   export default {
     small: 8,
     medium: 16,
     large: 24,
   };
   ```
2. Update `TaskCard` to use these spacing constants for margins and padding.
3. Try making your **Task List Screen** background color match your theme.

## Chapter Summary

You learned:

* How styling works in React Native
* Flexbox layout for mobile
* Dynamic and conditional styles
* Centralized theming with color and spacing constants
* How to start making your app visually consistent and responsive

## What is Next?

In **Chapter 5**, we’ll explore **Navigation and Routing** in React Native.

You’ll learn:

* Stack navigation
* Tab navigation
* Passing data between screens
* Setting up navigation containers

By the end of the next chapter, your app will have **multiple working screens with proper navigation flows**.

