---
featured: false
date: "2023-10-23"

series: "React Native for Web Developers"
part: "I. Getting Started"
chapter: "2. Project Structure and File Organization"

title: "Project Structure and File Organization"
description: "You’re a web developer. You know React.js. You're used to building fast, component-driven web apps that run in browsers. React Native makes that possible."
hero_image: "react-native-tutorial-banner-2.png"
tags: ["Getting Started", "React Native"]
has_quiz: true
---

# Chapter 2: Project Structure and File Organization

You’ve successfully run your first React Native app. Now, let’s talk about something every developer (especially coming from React.js) struggles with at the start:

**Project structure and folder organization.**

In small React Native apps, you can throw everything into the `App.js`. But as soon as your app grows—even just a few screens—that turns into a mess.

In this chapter, we’ll cover:

* Recommended folder structure for scalable React Native apps
* Managing assets (images, fonts, etc.)
* Handling platform-specific files
* Starting our **“Task Tracker Mobile”** project with a clean file structure
* First modular component: **TaskCard.js**

## 2.1 The Default React Native Folder Layout

If you started with the React Native CLI or Expo CLI, your project probably looks like this:

```
MyFirstApp/
├── App.js
├── node_modules/
├── package.json
├── android/
├── ios/
└── ...
```

This is fine for “Hello World”, but it **won’t scale** for real apps.

## 2.2 Recommended Scalable Folder Structure

Here’s a proven folder layout used by many production teams:

```
TaskTrackerMobile/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── services/
│   ├── utils/
│   ├── constants/
│   ├── hooks/
│   └── assets/
│       ├── images/
│       └── fonts/
├── App.js
├── app.json
├── package.json
└── ...
```

### Folder Breakdown

| Folder        | Purpose                                             |
| ------------- | --------------------------------------------------- |
| `components/` | Reusable UI components (e.g., buttons, cards)       |
| `screens/`    | Full-screen pages (e.g., HomeScreen, DetailsScreen) |
| `navigation/` | Navigation setup (Stack, Tabs, Drawers)             |
| `services/`   | API calls, external service logic                   |
| `utils/`      | Helper functions, validators, formatters            |
| `constants/`  | App-wide static config (colors, strings)            |
| `hooks/`      | Custom React hooks                                  |
| `assets/`     | Images, fonts, and other static assets              |

## 2.3 Managing Assets (Images and Fonts)

Unlike web apps, **React Native requires explicit asset management.**

### Adding Images

Place images in:

```
src/assets/images/
```

**Usage Example:**

```javascript
import React from 'react';
import { Image, View } from 'react-native';

export default function LogoHeader() {
  return (
    <View>
      <Image source={require('../assets/images/logo.png')} style={{ width: 100, height: 100 }} />
    </View>
  );
}
```

### Adding Custom Fonts

1. Place `.ttf` files inside:

```
src/assets/fonts/
```

2. Update `react-native.config.js` (if using React Native CLI):

```javascript
module.exports = {
  assets: ['./src/assets/fonts/'],
};
```

3. Run:

```bash
npx react-native link
```

## 2.4 Handling Platform-Specific Code

Sometimes you’ll need **iOS-only** or **Android-only** components.

React Native allows platform-specific files:

| File                  | Purpose                  |
| --------------------- | ------------------------ |
| `TaskCard.android.js` | Android-specific logic   |
| `TaskCard.ios.js`     | iOS-specific logic       |
| `TaskCard.js`         | Default (cross-platform) |

React Native automatically picks the correct file at build time.

## 2.5 Starting Our Project: Task Tracker Mobile

We’ll build a **Task Tracker Mobile App** as our running example throughout this series.

First, let’s create a simple reusable component: **TaskCard.js**

---

### File: `src/components/TaskCard.js`

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaskCard({ title, description }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
```

### Usage in `App.js`:

```javascript
import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import TaskCard from './src/components/TaskCard';

const DATA = [
  { id: '1', title: 'Write React Native Chapter', description: 'Cover project structure and file organization.' },
  { id: '2', title: 'Setup Testing Environment', description: 'Prepare Jest and Testing Library.' },
];

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskCard title={item.title} description={item.description} />
        )}
      />
    </SafeAreaView>
  );
}
```

**What this shows:**

- File organization for components
- Basic reusable UI
- List rendering with FlatList (which we’ll cover more deeply in the next section)

## 2.6 Common Mistakes (and Fixes)

| Mistake                                                  | Fix                                          |
| -------------------------------------------------------- | -------------------------------------------- |
| Importing from wrong relative path                       | Double-check `../` levels                    |
| Forgetting to run `react-native link` after adding fonts | Run `npx react-native link`                  |
| Accidentally mixing web CSS with React Native styles     | Use `StyleSheet.create` and avoid CSS syntax |

## 2.7 Your First Checkpoint

**✅ Task:**

1. Refactor your current project to follow the new folder structure.
2. Create an `assets/images/` folder and add a sample image.
3. Create at least **one custom component** in `/components` (e.g., `Header.js`).

## Chapter Summary

In this chapter, you learned:

* How to organize your React Native project for scalability
* Best practices for managing components, screens, and assets
* How to build and use a simple, testable, reusable component (`TaskCard`)

## What is Next?

In **Chapter 3**, we’ll dive deep into **React Native UI components**, starting with:

- **Views**,
- **Text**,
- **ScrollView**,
- **FlatList**, and
- **Touchable components**

We’ll also start building the main **Task List Screen** for our app.

---
