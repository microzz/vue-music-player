<template lang="html">

  <transition name="fade">
    <div v-show="isShowMiniMusic" class="footer">
      <div class="mini-music">
        <div class="music-img">
          <img ref="img" v-bind:src="audio.musicImgSrc || (musicData[0]&&musicData[0].musicImgSrc) || defaultImg" alt="">
        </div>
        <div class="music-name">
          <p>{{audio.name || (musicData[0]&&musicData[0].name) || 'Powered by microzz.com'}}</p>
          <div class="progress">
            <span class="start">{{transformTime(now)}}</span>
            <div @click="changeTime($event)" @touchmove="touchMove($event)" @touchend="touchEnd($event)" ref="progressBar" class="progress-bar">
              <div class="now" ref="now" :style="{width: (now / nativeAudio.duration).toFixed(3)*100 + '%'}"></div>
            </div>
            <span class="end" v-text="totalTime"></span>
          </div>
        </div>
        <div class="music-control">
          <span @click="play()" v-bind:class="[isPlaying ? pauseIcon : playIcon]"></span>
        </div>
      </div>
    </div>

  </transition>

</template>

<script>
import MusicData from '../../common/music-data';


export default {
  mounted() {
    this.nativeAudio = document.querySelector('audio');

    this.nativeAudio.addEventListener('play', () => {
      this.totalTime = this.transformTime(this.nativeAudio.duration);
      this.now = this.nativeAudio.currentTime;

      setInterval(() => {
        this.now = this.nativeAudio.currentTime;

      }, 1000)

    })
  },
  computed: {
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    // isAnimation() {
    //   return this.$store.state.isAnimation;
    // },
    isShowMiniMusic() {
      return this.$store.state.isShowMiniMusic;
    },
    audio() {
      return this.$store.state.audio;
    },
    DOM() {
      return this.$store.state.DOM;
    },
    musicData() {
      return this.$store.state.musicData;
    }

  },
  data() {
    return {
      MusicData,
      playIcon: 'play-icon',
      pauseIcon: 'pause-icon',
      now: 0,
      nativeAudio: {},
      totalTime: '0:00',
      defaultImg: 'https://microzz.com/img/avatar.jpg'
    }
  },
  methods: {
    play() {
      this.$store.commit('play', !this.isPlaying);
      !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play();
    },
    changeTime(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.pageX;
      this.nativeAudio.currentTime = (coordEnd - coordStart) / progressBar.offsetWidth * this.nativeAudio.duration;
      this.now = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit('play', true);
    },
    touchMove(event) {
      let progressBar = this.$refs.progressBar;
      let coordStart = progressBar.getBoundingClientRect().left;
      let coordEnd = event.touches[0].pageX;
      this.$refs.now.style.width = ((coordEnd - coordStart) / progressBar.offsetWidth).toFixed(3) * 100 + '%';
    },
    touchEnd(event) {
      this.nativeAudio.currentTime = this.$refs.now.style.width.replace('%', '')/100 * this.nativeAudio.duration;
      this.now = this.nativeAudio.currentTime;
      this.nativeAudio.play();
      this.$store.commit('play', true);
    },
    transformTime(seconds) {
      let m, s;
      m = Math.floor(seconds / 60);
      m = m.toString().length == 1 ? ('0' + m) : m;
      s = Math.floor(seconds - 60 * m);
      s = s.toString().length == 1 ? ('0' + s) : s;
      return m + ':' + s;
    }

  }
}
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: all .3s ease-in-out;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-active {
  transform: translateY(50px);
  opacity: 0;
}
  .footer {
    background: #B72712;
    width: 100%;
    height: 70px;
    text-align: center;

    .mini-music {
      display: flex;
      height: 70px;
      line-height: 70px;

      .music-img {
        width: 70px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 70px;
          height: 70px;
          border-radius: 35px;
          background-size: contain;
        }
      }
      .music-name {
        flex: 5;
        color: white;
        overflow: hidden;
        position: relative;
        width: 100%;

        p {
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          white-space: nowrap;
        }
        .progress {
          position: absolute;
          width: 100%;
          top: 10px;
          left: 0;
          span.start {
            position: absolute;
            left: 6px;
            // padding-right: 5px;
          }
          span.end {
            position: absolute;
            right: 4px;
            // padding-left: 5px;
          }
          .progress-bar {
            position: relative;
            width: 50%;
            height: 5px;
            display: inline-block;
            background-color: rgba(255, 255, 255, .5);
            vertical-align: 2px;
            border-radius: 3px;


            .now {
              position: absolute;
              left: 0;
              display: inline-block;
              // width: 70%;
              height: 5px;
              background-color: #31c27c;
            }
            .now::after {
              content: "";
              position: absolute;
              left: 100%;
              width: 2px;
              height: 6px;
              background-color: white;
            }
          }
        }
      }
      .music-control {
        flex: 1.5;

        .play-icon {
          padding-right: 10px;
          width: 45px;
          height: 45px;
          margin-top: 13px;
          display: inline-block;
          background: url(./play.svg) no-repeat;
          background-size: contain;
        }
        .pause-icon {
          padding-right: 10px;
          width: 45px;
          height: 45px;
          margin-top: 13px;
          display: inline-block;
          background: url(./pause.svg) no-repeat;
          background-size: contain;
        }
      }
    }
  }
</style>
