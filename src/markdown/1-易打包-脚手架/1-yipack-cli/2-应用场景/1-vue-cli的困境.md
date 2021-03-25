## vue-cli 的困境

vue-cli 是 vue 框架官方脚手架。
很多用过 vue-cli 的同学，能够体会到使用它进行 vue 项目开发的灵活，方便之处。
我本人 2018 年才开始使用 vue-cli 进行项目开发，作为官方的项目脚手架工具，通用性没得说。
用了一段时间后，我慢慢也发现了 vue-cli 的一些不足之处，也可以说是，这种国际性通用工具的普遍痛点，那就是：过于灵活。

那么，到底有多灵活呢？

```bash
>(*) Babel
 ( ) TypeScript
 ( ) Progressive Web App (PWA) Support
 ( ) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing

> Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
  Stylus

> ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
  ESLint + Prettier
```

比如，css 预处理器，就可以自由配置：less、scss/sass、stylus，scss 编译器还可以选择 dart-sass 或 node-sass。

vue-cli 的优点就是，强大且自由。

vue-cli 的缺点就是，过于自由。

试想一下，大部分时候，开发项目，最重要的是什么？是效率和稳定。

自由的代价，就会极有可能导致不稳定，维护与合作就会降低效率。

同时，一千个读者，就有一千个哈姆雷特。

不同的人手里，vue-cli 就能配置出不同的花样。

这对于前端工程化和可维护性来说，都是不友好的。

```bash
├─assets
│  └─logo.png
├─components
│  └─HelloWorld.vue
├─router
│  └─index.js
├─store
│  └─index.js
├─views
│  ├─Home.vue
│  └─About.vue
├─App.vue
└─main.js
```

而且，通过 vue-cli 脚手架创建的初始化项目骨架，非常简单，没有多少约定。

约定就是法律，没有法律的规范，那就很容易失控。

与【入门指引】卷的【项目结构】章节对比来说，yipack-cli 脚手架创建的项目，【约定大于配置】的理念，已经深深地刻在了 yipack 的骨子里。
