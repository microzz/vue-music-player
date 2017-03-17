<template>
  <div id="app">

    <!-- 头部音乐信息 -->
    <div v-bind:style="{backgroundColor: skinColor}" class="header">
      <div v-on:click="isShowAdd=!isShowAdd" class="add-icon">
        <img src="http://omratag7g.bkt.clouddn.com/add.png" class="icon" alt="microzz.com">
      </div>
      <div class="music-title">
        <p>{{ musicTitle }}</p>
      </div>
      <div class="list-icon">
        <img v-on:click="isShowList=!isShowList" src="http://omratag7g.bkt.clouddn.com/Category.png" class="icon" alt="microzz.com">
      </div>
    </div>

    <!-- 音乐内容主体区域 -->
    <div v-on:click.stop.prevent="isShowList=false" class="content">

      <audio v-bind:src="musicSrc" preload >
        Your browser does not support the audio element.
      </audio>

      <!-- 添加音乐 -->
      <transition name="fade">
        <div v-show="isShowAdd" class="add-music">
          <p>添加歌曲</p>
          <div class="form">

            <div class="input-music-name input">
              <label for="music-name">歌曲名称</label>
              <input v-model.trim="newMusicName" v-on:keyup.enter="addMusic" id="music-name" type="text" placeholder="请输入要显示的歌曲名(必填)">
              <img v-on:click.stop.prevent="newMusicName=''" src="http://omratag7g.bkt.clouddn.com/del2.png" alt="microzz.com">
            </div>

            <div class="input-music-src input">
              <label for="music-src">歌曲链接</label>
              <input v-model.trim="newMusicSrc" v-on:keyup.enter="addMusic" id="music-src" type="text" placeholder="请输入歌曲超链接(必填)">
              <img v-on:click.stop.prevent="newMusicSrc=''" src="http://omratag7g.bkt.clouddn.com/del2.png" alt="microzz.com">
            </div>

            <div class="input-music-img-src input">
              <label for="music-img-src">照片链接</label>
              <input v-model.trim="newMusicImgSrc" v-on:keyup.enter="addMusic" id="music-img-src" type="text" placeholder="请输入歌曲写真照片链接">
              <img v-on:click.stop.prevent="newMusicImgSrc=''" src="http://omratag7g.bkt.clouddn.com/del2.png" alt="microzz.com">
            </div>

            <div class="input-btn input">
              <button v-on:click.stop.prevent="addMusic">添加音乐</button>
              <button v-on:click.stop.prevent="isShowAdd=false">取消操作</button>
            </div>

          </div>
        </div>
      </transition>

      <!-- 音乐列表，同是设置显示、隐藏的过渡效果 -->
      <transition name="fade">
        <div class="music-list" v-show="isShowList">
          <ul>
            <li v-on:click.stop.prevent="toggleMusic(item, index)" v-bind:class="{ activeColor: item.src === (DOM.audio && DOM.audio.src) }" v-for="(item, index) in musics">
              {{ item.name }}
              <img v-on:click.stop.prevent="delMusic(index)" src="http://omratag7g.bkt.clouddn.com/%E5%88%A0%E9%99%A4.png" alt="microzz.com">
            </li>
          </ul>
        </div>
      </transition>

      <!-- 提示信息框 -->
      <transition name="fade">
        <div class="msg" v-if="isShowMsg">
          <img src="http://omratag7g.bkt.clouddn.com/%E6%8F%90%E7%A4%BA.png" alt="microzz.com">
          <p>{{ msg }}</p>
        </div>
      </transition>


      <div class="bg-img">
        <img v-bind:src="musicImgSrc" alt="microzz.com">
      </div>

      <div class="content-header"></div>

      <div class="img">
          <img v-bind:class="{imgAnimate: isImgAnimate}" class="rotateImg" v-bind:src="musicImgSrc" alt="microzz.com">
      </div>

      <div class="content-footer"></div>

      <!-- 换肤 -->
      <transition name="fade">
        <div v-show="isShowColor" v-on:click.capture="isShowColor=false" class="select-skin">
          <div v-on:click.stop.prevent="skinColor='#B72712'" v-bind:class="{borderStyle: ('#B72712'==skinColor)}" class="one"></div>
          <div v-on:click.stop.prevent="skinColor='#1565C0'" v-bind:class="{borderStyle: ('#1565C0'==skinColor)}" class="two"></div>
          <div v-on:click.stop.prevent="skinColor='#212121'" v-bind:class="{borderStyle: ('#212121'==skinColor)}" class="three"></div>
          <div v-on:click.stop.prevent="skinColor='#1B5E20'" v-bind:class="{borderStyle: ('#1B5E20'==skinColor)}" class="four"></div>
        </div>
      </transition>

        <img v-on:click.stop.prevent="isShowColor = !isShowColor" class="skin" v-bind:src="skinSrc" alt="microzz.com">

    </div>

    <!-- 底部控制栏  -->
    <div v-bind:style="{backgroundColor: skinColor}" class="footer">

      <div class="prev">
        <img v-on:click.stop.prevent="toPrev" src="http://omratag7g.bkt.clouddn.com/music_rewind_button.png" class="icon" alt="microzz.com">
      </div>

      <div class="start-pause">
        <img v-on:click.stop.prevent="startPause" v-bind:src="playBtnSrc" class="icon" alt="microzz.com">
      </div>

      <div class="next">
        <img v-on:click.stop.prevent="toNext" src="http://omratag7g.bkt.clouddn.com/music_fastforward_button.png" class="icon" alt="microzz.com">
      </div>

    </div>

  </div>
</template>

<script>
// 导入音乐数据
import MusicData from './music-data';

// 导入封装的 localStorage 相关方法
import Store from './store';

export default {
  name: 'app',
  // 页面载入初始化
  mounted() {
    this.DOM = {
      audio: document.querySelector('audio'),
      rotateImg: document.querySelector('.rotateImg')
    };
    this.musicSrc = this.musics[this.index].src;
    this.musicTitle = this.musics[this.index].name;
    this.musicImgSrc = this.musics[this.index].musicImgSrc || this.musicSrcDefault;
    this.DOM.audio.addEventListener('ended', () => {this.toChange('next').then(this.toAnimate);});
    Store.fetch('musics').length === 0 ? Store.save(this.musics) : null;

  },
  data() {
    return {
      musicTitle: '',
      playBtnSrc: 'http://omratag7g.bkt.clouddn.com/music_play_button.png',
      DOM: {},
      musicImgSrc: '',
      musics: Store.fetch('musics').length ? Store.fetch('musics') : Object.assign([], MusicData),
      index: 0,
      musicSrc: '',
      isImgAnimate: false,
      isShowList: false,
      isShowMsg: false,
      isShowColor: false,
      changeFlag: '',
      musicSrcDefault: 'http://omratag7g.bkt.clouddn.com/music-bg.jpg',
      isShowAdd: false,
      newMusicName: '',
      newMusicSrc: '',
      newMusicImgSrc: '',
      msg: '',
      skinSrc: 'http://omratag7g.bkt.clouddn.com/%E7%9A%AE%E8%82%A4%20%281%29.png',
      skinColor: localStorage.skinColor ? localStorage.skinColor: '#B72712'
    }
  },
  watch: {
    musics: {
      handler(musics) {
        Store.save(musics);
      },
      deep: true
    },
    skinColor: {
      handler(skinColor) {
        localStorage.setItem('skinColor', skinColor);
      }
    },
    isShowColor: {
      handler(isShowColor) {
        this.skinSrc = isShowColor ? 'http://omratag7g.bkt.clouddn.com/%E7%9A%AE%E8%82%A4.png' : 'http://omratag7g.bkt.clouddn.com/%E7%9A%AE%E8%82%A4%20%281%29.png';
      }
    }
  },
  methods: {
    // 显示提示信息
    showMsg(msg) {
      this.msg = msg;
      this.isShowMsg = true;
      setTimeout( () => {
        this.isShowMsg = false;
      }, 2000)
    },
    // 增加音乐
    addMusic() {
      if (!this.newMusicName || !this.newMusicSrc) {
        this.showMsg('请填写完整信息哦😜');
        return;
      }
      if (!(/^(https?).*(mp3|ogg|m4a)$/i.test(this.newMusicSrc))) {
        this.showMsg('你的音乐链接可能无效哦,请重新输入');
        return;
      }
      let newMusic = {
        name: this.newMusicName,
        src: this.newMusicSrc,
        musicImgSrc: this.newMusicImgSrc || this.musicSrcDefault
      };
      this.musics.push(newMusic);
      this.isShowAdd = false;
      this.newMusicName = '';
      this.newMusicSrc = '';
      this.newMusicImgSrc = '';
      this.showMsg('添加音乐成功😄')
    },
    // 删除音乐
    delMusic(index) {
      if (confirm('确认删除吗？')) {
        this.musics.splice(index, 1);
        if (this.musics.length === 0) {
          this.musicTitle = '没有歌曲啦 💔';
          this.DOM.audio.autoplay = false;
          this.DOM.audio.pause();
          this.isImgAnimate = false;
          this.playBtnSrc = 'http://omratag7g.bkt.clouddn.com/music_play_button.png';
          this.DOM.rotateImg.style.animationPlayState = 'paused';
          this.musicImgSrc = this.musicSrcDefault;
          this.showMsg('赶紧添加几首音乐吧😄');
          return;
        }
        if (index == this.index) {
          this.index --;
          if (this.DOM.audio.paused) {
            this.toNext().then(() => {
              setTimeout(() => {
                this.DOM.audio.autoplay = false;
                this.DOM.audio.pause();
                this.isImgAnimate = false;
                this.playBtnSrc = 'http://omratag7g.bkt.clouddn.com/music_play_button.png';
                this.DOM.rotateImg.style.animationPlayState = 'paused';
              }, 0)

            });

          } else {
            this.toNext();
          }
      }

      }
    },
    // 列表切换音乐
    toggleMusic(item, index) {
      this.index = index;
      this.musicTitle = item.name;
      this.musicSrc = item.src;
      this.musicImgSrc = item.musicImgSrc || this.musicSrcDefault;
      this.DOM.audio.autoplay = true;
      this.isImgAnimate = true;
      this.playBtnSrc = 'http://omratag7g.bkt.clouddn.com/music_pause_button.png';
      this.DOM.audio.play();
      this.toAnimate();
      this.isShowList = false;

    },
    // 图片旋转
    toAnimate() {
      this.isImgAnimate = false;
      // 异步
      setTimeout( ()=> {
        this.isImgAnimate = true;
        this.DOM.rotateImg.style.animationPlayState = 'running';
      }, 0);
    },

    // 切换
    toChange(changeFlag) {
      // Promise 异步
      return new Promise( (resolve, reject) => {
        if (changeFlag === 'prev') {
          this.index -= 1;
          this.index = this.index < 0 ? this.musics.length-1 : this.index;
        } else {
          this.index += 1;
          this.index = this.index > this.musics.length-1 ? 0 : this.index;
        }
        this.musicSrc = this.musics[this.index].src;
        this.playBtnSrc = 'http://omratag7g.bkt.clouddn.com/music_pause_button.png';
        this.DOM.audio.autoplay = true;
        this.musicTitle = this.musics[this.index].name;
        this.musicImgSrc = this.musics[this.index].musicImgSrc || this.musicSrcDefault;
        resolve();
      });
    },

    // 上一首
    toPrev() {
      this.toChange('prev').then(this.toAnimate);
    },

    // 开始 or 暂停
    startPause() {
      this.playBtnSrc = this.DOM.audio.paused ? 'http://omratag7g.bkt.clouddn.com/music_pause_button.png' : 'http://omratag7g.bkt.clouddn.com/music_play_button.png';
      this.DOM.audio.paused ? this.DOM.audio.play() : this.DOM.audio.pause();
      this.DOM.rotateImg.style.animationPlayState = this.DOM.audio.paused ? 'paused' : 'running'
      this.isImgAnimate = true;
    },

    // 下一首
    toNext() {
      return new Promise( (resolve, reject) => {
        this.toChange('next').then(this.toAnimate).then(resolve);
      })
    }
  },

  components: {}
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.borderStyle {
  border: 1px solid #E0E0E0;
  box-shadow: 0 0 3px #FFD600;
}

.msg {
  position: absolute;
  z-index: 4;
  top: 2px;
  right: 0;
  margin: auto;
  padding-left: 35px;
  padding-right: 20px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  padding-top: 2px;
  padding-bottom: 5px;
}

.msg img {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 6px;
  left: 10px;
}

.msg p {
  margin: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: white;
}

.activeColor {
  color: #FF6E40;
}

.header {
  flex: 1;
  background-color: #212121;
  display: flex;
  align-items: center;
}

.header img {
  width: 30px;
  height: 30px;
}

.header .add-icon {
  width: 30px;
  height: 30px;
  flex: 1;
  text-align: left;
  padding-left: 10px;
  padding-top: 5px;
  cursor: pointer;
}

.header .music-title {
  flex: 5;
  text-align: center;
}

.header .list-icon {
  width: 30px;
  height: 30px;
  flex: 1;
  text-align: right;
  padding-right: 10px;
  padding-top: 5px;
}

.header .list-icon img {
  width: 23px;
  cursor: pointer;
}

.header .music-title p {
  width: 250px;
  color: white;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: auto;
}

.content {
  flex: 11;
  display: flex;
  flex-direction: column;
  position: relative;
}

.content .add-music {
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 98%;
  z-index: 3;
  position: fixed;
  left: 0;
  bottom: 0;
  padding-top: 10px;
  overflow: auto;
}

.content .add-music p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 3rem;
}

@media only screen and (min-width: 1024px) {
  .content .add-music p {
      margin-top: 6rem;
  }
}

.content .add-music .form {
  /*padding-bottom: 10px;*/

}

.content .add-music .form img {
  width: 20px;
  height: 20px;
  position: relative;
  margin-left: -29px;
  top: 6px;
  border-radius: 11px;
}

input {
  border: none;
  border-bottom: 2px solid #C6FF00;
  outline: none;
  padding: 5px;
  width: 200px;
  border-radius: 3px;
  box-shadow: 0 0 10px #FF5722;
  padding-right: 25px;
}


.content .add-music .form .input-music-name {
  margin-bottom: 1.8rem;
}

.content .add-music .form .input-music-src {
  margin-bottom: 1.8rem;
}

.content .add-music .form .input-music-img-src {
  margin-bottom: 2rem;
}

.content .add-music .form .input-btn {

}

.content .add-music .form .input-btn button {
  background: white;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 9px #FF5722;
  margin: auto 15px;
  font-size: 1rem;
  font-weight: bold;
  color: #263238;
  padding: 7px;
  border-bottom: 1px dotted green;
}

.content .add-music .form .input-btn button:first-child {
  margin-left: 2rem;
}

.content .music-list {
  position: absolute;
  z-index: 3;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  height: 100%;
}

.content li img {
  width: 20px;
  height: 20px;
  position: relative;
  margin-left: 10px;
  top: 3px;
  cursor: pointer;
}

ul {
  list-style: decimal;
  background: rgba(0, 0, 0, .7);
  margin: 0;
  box-shadow: 0 0 6px #2196F3;
  border-radius: 10px 0 0 10px;
}

ul li {
  color: #BDBDBD;
  border-bottom: 1px solid #616161;
  font-weight: 400;
  padding-right: 5px;
  padding-top: 7px;
  padding-bottom: 7px;
  cursor: pointer;
}

.content .bg-img img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  filter: blur(8px);
  z-index: -1;
}

.content .content-header {
  flex: 1;
}

.content .img {
  flex: 5;
  display: flex;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.content .img img {
  width: 240px;
  height: 240px;
  border-radius: 120px;
  margin: auto;
  z-index: 1;
}

.imgAnimate {
  animation: rotateAnimation 18s linear infinite;
}

.content .content-footer {
  flex: 1;
}

.content .select-skin {
  width: 22px;
  height: 121px;
  position: absolute;
  right: 18px;
  bottom: 60px;
}

.content .select-skin div {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
}


.content .select-skin div.four {
  bottom: 95px;
  background-color: #1B5E20;
  flex: 1;
}

.content .select-skin div.one {
  bottom: 65px;
  background-color: #B72712;
  flex: 1;
}
.content .select-skin div.two {
  bottom: 35px;
  background-color: #1565C0;
  flex: 1;
}
.content .select-skin div.three {
  bottom: 5px;
  background-color: #212121;
  flex: 1;
}

.content img.skin  {
  width: 40px;
  height: 40px;
  position: absolute;
  right: 10px;
  bottom: 20px;
  cursor: pointer;
}

.footer {
  flex: 1.8;
  border-top: 1px white solid;
  display: flex;
  background-color: #212121;
}

.footer>.prev {
  flex: 5;
  text-align: center;
  margin: auto;
}

.footer>.start-pause {
  flex: 1;
  text-align: center;
  margin: auto;
}

.footer>.next {
  flex: 5;
  text-align: center;
  margin: auto;
}

.footer .icon {
  width: 40px;
  height: 40px;
}

.footer .icon:hover {
  cursor: pointer;
}

.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>
