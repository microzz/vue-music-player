<template lang="html">

  <transition name="showRouter">
    <div  @click="isShowControl=true" @touchend="isShowControl=true" class="social">

      <div v-show="isShowMask" class="mask">
        <div class="loading">
          <i class="icon-loading"></i>加载中
        </div>
      </div>

      <div class="title">
        <div v-text="date" class="date" ></div>
        <div v-text="volume" class="title-desc" ></div>
      </div>

      <div class="img">
        <img v-bind:src="imgUrl" alt="插画 - microzz.com">
        <div class="img-desc" >插画 | {{picInfo}}</div>
      </div>

      <div class="content">
        <p v-text="forward"></p>
        <div v-text="wordsInfo" class="content-desc"></div>
      </div>

      <transition name="fade">
        <div v-show="isShowControl" class="control">
          <div class="prev">
            <a @click="getOne(--index)" :class="{gray: index === 0}" href="javascript:;">上一篇</a>
          </div>
          <div class="loading">
            <div v-if="!isLoading" class="one">One</div>
            <div v-else class="icon-loading"></div>
          </div>
          <div class="next">
            <a @click="getOne(++index)" :class="{gray: index === 9}" href="javascript:;">下一篇</a>
          </div>

        </div>
      </transition>
    </div>
  </transition>

</template>

<script>

export default {
  name: 'Social',
  components: {},
  beforeCreate() {
    this.$store.commit('showMiniMusic', false);
  },
  created() {
    this.getOne();
  },
  mounted() {
    this.$store.commit('changeLinkBorderIndex', 3);
  },
  data() {
    return {
      date: '',
      volume: '',
      imgUrl: '',
      picInfo: '',
      forward: '',
      wordsInfo: '',
      index: 0,
      isLoading: false,
      isShowMask: true,
      isShowControl: false
    }
  },
  methods: {
    getOne(index = 0) {
      if (index > 9) {
        this.index = 9;
        return ;
      }
      if (index < 0) {
        this.index = 0;
        return ;
      }
      this.isLoading = true;
      this.axios.get('/api/one/' + index)
        .then(res => res.data.data.content_list[0])
        .then(one => {
          this.date = one.post_date.split(' ')[0].replace(/\-/g, ' / ');
          this.volume = one.volume;
          this.imgUrl = one.img_url;
          this.picInfo = one.pic_info;
          this.forward = one.forward;
          this.wordsInfo = one.words_info;
          this.isLoading = false;
          this.isShowMask = false;
          setTimeout(() => {
            this.isShowControl=false;
          }, 250)

        })
    }
  },
}
</script>

<style lang="scss" scoped>
.showRouter-enter-active {
  transition: all .3s ease;
}
.showRouter-leave-active {
  transition: all 0 ease-out;
}
.showRouter-enter, .showRouter-leave-active {
  transform: translateX(450px);
  opacity: 0;
}
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
  .social {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    flex:7;
    overflow: auto;
    background-color: rgba(0, 0, 0, .05);
    padding-bottom: 200px;
    .mask {
      position: absolute;
      z-index: 2;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: white;
      .loading {
        text-align: center;
        padding-top: 20px;
        font-size: 120%;
        .icon-loading {
          display: inline-block;
          width: 30px;
          height: 30px;
          background: url('./loading.svg') no-repeat;
          background-size: contain;
          animation: loading .6s linear infinite;
          vertical-align: text-bottom;
          margin-right: 10px;
        }
      }

    }
    .title {
      flex: 1;
      text-align: center;
      .date {
        // width: 200px;
        padding-top: 5px;
        margin: auto;
        font-weight: bold;
        font-size: 110%;
        position: relative;
        text-align: center;
        letter-spacing: 2px;
      }
      .title-desc {
        color: #808080;
        font-size: 50%;
        letter-spacing: 2px;
      }

    }
    .img {
      // flex: 4;
      padding-bottom: 10px;
      margin-top: 4px;
      margin-bottom: 5px;
      img {
        width: 100%;
        height: auto;
      }
      .img-desc {
        text-align: center;
        font-size: 50%;
        color: #808080;
      }

    }
    .content {
      // flex: 2;
      padding: 2px 10px;
      p {
        font-size: 80%;
        color: #000;
        margin-bottom: 4px;
      }
      .content-desc {
        text-align: center;
        font-size: 40%;
        color: #808080;
      }
    }

    .control {
      position: fixed;
      bottom: 0;
      // left: 0;
      display: flex;
      flex: 1;
      justify-content: center;
      text-align: center;
      background-color: none;
      width: 100%;
      padding: 10px 0;
      a {
        color: black;
        position: relative;
        // background-color: gray;
      }
      .gray {
        color: gray;
      }
      a::after {
        content: "";
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: gray;
        transform: scaleX(0);
        transition: all .4s ease-in-out;
      }
      a:hover::after {
        transform: scaleX(1);
      }
      .prev {
        flex: 1;
      }
      .loading {
        flex: 1;
          .icon-loading {
            margin: auto;
            width: 22px;
            height: 22px;
            background: url('./loading.svg') no-repeat;
            background-size: contain;
            animation: loading .6s linear infinite;
            // transform: rotate(360deg);
            // transition: 5s ease-in-out;
          }
      }
      .next {
        flex: 1;
      }
    }
    @media screen and(min-width: 769px) {
      .control {
        width: 460px;
      }
    }
    .control::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: rgba(0, 0, 0, .1);
    }
  }
  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
