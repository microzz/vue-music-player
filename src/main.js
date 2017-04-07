// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuex from 'vuex'


Vue.config.productionTip = false

// 用 axios 进行 Ajax 请求
Vue.use(VueAxios, axios);

// Vuex 进行状态管理
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    musicData: [],
    skinColor: localStorage.skinColor || '#B72712',
    isShowIndex: true,
    isPlaying: false,
    isAnimation: false,
    isShowAsideMenu: false,
    isShowMiniMusic: false,
    isShowAbout: false,
    linkBorderIndex: '',
    DOM: {},
    audio: {
      name: '',
      src: '',
      musicImgSrc: '',
      index: 0
    }
  },
  mutations: {
    del(state, index) {
      if (state.musicData.length === 0) {
        return;
      }
      state.musicData.splice(index, 1);
    },
    play(state, flag) {
      state.isPlaying = flag;
    },
    addMusic(state, payload) {
      for (let music of state.musicData) {
        if (JSON.stringify(music) === JSON.stringify(payload)) {
          return;
        }
      }
      state.musicData.unshift(payload);
    },
    toggleMusic(state, index) {
        state.audio.name = state.musicData[index].name;
        state.audio.src = state.musicData[index].src;
        state.audio.musicImgSrc = state.musicData[index].musicImgSrc;
        state.audio.index = index;
    },
    playMusic(state, payload) {
      state.audio.name = payload.name;
      state.audio.src = payload.src;
      state.audio.musicImgSrc = payload.imgSrc;
      state.isPlaying = true;
    },
    findDOM(state, payload) {
      state.DOM[payload.name] = payload.dom;
    },
    showIndex(state, flag) {
      state.isShowIndex = flag;
    },
    showAsideMenu(state, flag) {
      state.isShowAsideMenu = flag;
    },
    showMiniMusic(state, flag) {
      state.isShowMiniMusic = flag;
    },
    showAbout(state, flag) {
      state.isShowAbout = flag;
    },
    changeLinkBorderIndex(state, index) {
      state.linkBorderIndex = index;
    },
    changeSkinColor(state, color) {
      state.skinColor = color;
    }
  },
  actions: {
    getData({ commit,state }) {
      if (localStorage.musics !== '[]' && localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics);
        return;
      }
      return new Promise((resolve, reject) => {
        Vue.axios.get('/api/music-data')
            .then (res => {
              if (res.data.errno === 0) {
                state.musicData = res.data.musicData;
                localStorage.musics = JSON.stringify(state.musicData);
              }
            })
            .then(() => {
              commit('toggleMusic',0)
            });
        resolve();
      });
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
