# Vue.js写一个音乐播放器
## 在线预览
在线预览地址1: 🔗https://microzz.github.io/vue-music-player/
在线预览地址2: 🔗http://microzz.cn/vue-music/

## 源代码
GitHub地址: 🔗https://github.com/microzz/vue-music-player
欢迎大家follow和star哦

## 介绍
学习Vue.js后，决定做个小项目锻炼一下，于是选择了典型的音乐播放器上手。其中遇到了很多坑，也学到了很多。代码可能还有瑕疵，欢迎大家到我的[GitHub](https://github.com/microzz/vue-music-player)反馈，相互交流学习。同时也欢迎大家follow和star😄
预览图：
![红色皮肤-microzz.com](https://github.com/microzz/vue-music-player/blob/master/preview/red.png?raw=true)
![绿色皮肤-microzz.com](https://github.com/microzz/vue-music-player/blob/master/preview/green.png?raw=true)
![蓝色皮肤-microzz.com](https://github.com/microzz/vue-music-player/blob/master/preview/blue.png?raw=true)
![黑色皮肤-microzz.com](https://github.com/microzz/vue-music-player/blob/master/preview/black.png?raw=true)

### 技术栈

#### **Vue.js**
Vue的双向数据绑定真的很爽，让开发者更多的关注业务逻辑，而不是耗性能的DOM操作。借鉴了React.js和Angular.js等著名框架，Vue写起来也的确很方便，很多地方也想的很周到。因为实际场景，并没有使用到路由、vuex等东西。
其中也遇到了几个值得注意的地方：
1. 用好`watch`会事半功倍
2. 有些操作要在实例加载完，所以钩子函数`mounted`需要注意
3. 很多小技巧要试过才知道走了弯路😂

-------

#### **ES6**
本示例采用的是ES6的语法，因为webpack编译，所以也不必太过当心兼容性问题。ES6也即ECMAScript 2015，发布也有一段时间了，很多地方很方便，这是大势所趋，以后会慢慢地向ES6迁移。掌握是很必要的！

-------

#### HTML5
**localStorage**
本demo用localStorage本地存储保存用户设置（如：皮肤）和用户歌单列表

-------

#### CSS3
很多动画都是依靠CSS3完成的，方便性能也不错，缺点是兼容性问题。

-------


## 更新记录
### 2017.03.13
A music player by Vue.js。一个由Vue.js写的音乐播放器，今天完成了播放器的大体功能，数据是通过JSON模拟

#### 后续完善
1. 搭建后台调用网上音乐API
2. 完善功能

-------
### 2017.03.14
列表部分功能完善，部分代码优化，部分异步代码Promise化

#### 后续完善
1. 冗余代码整合优化
2. 部分代码封装


-------

### 2017.03.15
1.0.0正式版发布

## About
个人网站：🔗https://microzz.com/
GitHub：🔗https://github.com/microzz


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


