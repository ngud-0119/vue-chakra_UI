
<p align="center">
  <img alt="Build & Test Components" src="https://github.com/chakra-ui/chakra-ui-vue/workflows/Build%20&%20Test%20Components/badge.svg" />
  <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/0140cfa8-f093-4a69-b29b-6b1abce0c04a/deploy-status" />
  <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square" />
</p>


<p align="center">
  <a href="https://github.com/chakra-ui/chakra-ui-vue">
    <img src="https://res.cloudinary.com/xtellar/image/upload/v1584242872/chakra-ui/chakra-ui-vue.png" alt="chakra-ui symbol" width="300" />
  </a>
</p>

<h2 align="center">Build scalable and accessible Vue.js applications with ease.</h2>


**@chakra-ui/vue** gives you a set of accessible and composable Vue components that you can use to build your favourite applications and sites.

<p align="center"><strong><i>Made for Vue 2.X</i></strong></p>

## Looking for the documentation?
Head over here => https://vue.chakra-ui.com

<p align="center">
  <a href="https://github.com/chakra-ui/chakra-ui-vue/issues/160">
    <strong>中文文档翻译Github问题</strong>
  </a>
</p>

## Features

- **Ease of Styling:** Chakra UI contains a set of layout components like `CBox` and
  `CStack` that make it easy to style your components by passing props.
  [Learn more](https://chakra-ui.com/style-props)
- **Flexible & composable**: Chakra UI  components are built on top of a Vue UI Primitive for endless composability.
- **Accessible**. Chakra UI components follows the WAI-ARIA guidelines
  specifications and have the right `aria-*` attributes.
- **Dark Mode 😍**: Most components in Chakra UI are dark mode compatible.

### Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
   a. [With Nuxt](#nuxt-usage)

- [Looking for the documentation?](#looking-for-the-documentation)
- [Features](#features)
  - [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
  - [Codesandbox starters](#codesandbox-starters)
  - [Storybook Components](#storybook-components)
  - [Development for Contributing:](#development-for-contributing)
    - [Related](#related)
- [Contributors ✨](#contributors)

## Installation

```bash
yarn add @chakra-ui/vue emotion
```

or

```bash
npm install @chakra-ui/vue emotion
```

<a id="nuxt-usage"></a>

> **Note:**
> If you're using Nuxt, you need to install `@nuxtjs/emotion` package as well to server-side render your styles.

```bash
yarn add @chakra-ui/vue emotion @nuxtjs/emotion
```

## Usage

**1. Import the Chakra UI plugin in your `main.js` file.**

```js
import Vue from 'vue'
import Chakra from '@chakra-ui/vue'
import App from './App.vue'

Vue.use(Chakra)

new Vue({
  el: '#app',
  render: (h) => h(App)
}).$mount()
```

**2. Wrap your application inside the Chakra `CThemeProvider`.** We also recommend that you include the `CReset` component to normalize all browser styling.

_In your `App.vue` file._

```html
<template>
  <CThemeProvider>
    <CReset />

    <!--
      Your application code goes here! 😁
    -->
  </CThemeProvider>
</template>

<script>
  import { CThemeProvider, CReset } from '@chakra-ui/vue'

  export default {
    name: 'App',
    components: {
      CThemeProvider,
      CReset
    }
  }
</script>
```

If you'd like to toggle your app between dark and light mode, you can also wrap your application inside the `ColorModeProvider` component.

**3. Hurray!🎉 Now the fun can begin**. You can start using components like so:

```html
<template>
  <CThemeProvider>
    <CReset />

    <!--
      Your application code goes here! 😁
    -->
    <CButton variantColor="blue">
      Chakra consumed ⚡️
    </CButton>
  </CThemeProvider>
</template>

<script>
  import { CThemeProvider, CReset, CButton } from '@chakra-ui/vue'

  export default {
    name: 'App',
    components: {
      CThemeProvider,
      CReset,
      CButton
    }
  }
</script>
```

### Codesandbox starters

- [Vue Starter](https://codesandbox.io/s/chakra-ui-vue-starter-2sy0g)
- [Nuxt Starter](https://codesandbox.io/s/chakra-ui-nuxt-demo-f8tq4)
- [Gridsome Starter](https://codesandbox.io/s/chakra-ui-gridsome-demo-038c9)

### Storybook Components

You can also view all developed components in **[Storybook](https://chakra-ui-vue.netlify.com)!**

### Development for Contributing:

Interested in contributing? See our [open issues](https://github.com/chakra-ui/chakra-ui-vue/issues)! Remember to take a look at our [CONTRIBUTORS](./.github/CONTRIBUTING.md) guide.

```bash
yarn install
yarn bootstrap
yarn dev
```

#### Related
- [Chakra UI for React](https://github.com/chakra-ui/chakra-ui)
- [Vuetify](https://vuetifyjs.org)
- [Buefy](https://buefy.org)
- [Vuesax](https://lusaxweb.github.io/vuesax/)

<a id="contributors"></a>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://jbakebwa.dev"><img src="https://avatars2.githubusercontent.com/u/21237954?v=4" width="100px;" alt=""/><br /><sub><b>Jonathan Bakebwa</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui-vue/commits?author=codebender828" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui-vue/commits?author=codebender828" title="Tests">⚠️</a> <a href="https://github.com/chakra-ui/chakra-ui-vue/commits?author=codebender828" title="Documentation">📖</a></td>
    <td align="center"><a href="http://twitter.com/imesutkoca"><img src="https://avatars2.githubusercontent.com/u/342666?v=4" width="100px;" alt=""/><br /><sub><b>Mesut</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui-vue/commits?author=koca" title="Code">💻</a> <a href="https://github.com/chakra-ui/chakra-ui-vue/commits?author=koca" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://bit.ly/becomeworldclass"><img src="https://avatars0.githubusercontent.com/u/24433274?v=4" width="100px;" alt=""/><br /><sub><b>Omereshone Kelvin Oghenerhoro</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui-vue/commits?author=DominusKelvin" title="Documentation">📖</a></td>
    <td align="center"><a href="https://convenientstop.netlify.com"><img src="https://avatars0.githubusercontent.com/u/1885157?v=4" width="100px;" alt=""/><br /><sub><b>Eric Carboni</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui-vue/commits?author=convenientstop" title="Documentation">📖</a></td>
    <td align="center"><a href="http://inusahharis.netlify.com"><img src="https://avatars3.githubusercontent.com/u/28383750?v=4" width="100px;" alt=""/><br /><sub><b>ankorGH</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui-vue/commits?author=ankorGH" title="Documentation">📖</a></td>
    <td align="center"><a href="https://peoray.dev"><img src="https://avatars2.githubusercontent.com/u/23735423?v=4" width="100px;" alt=""/><br /><sub><b>Emmanuel Raymond</b></sub></a><br /><a href="https://github.com/chakra-ui/chakra-ui-vue/commits?author=peoray" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
