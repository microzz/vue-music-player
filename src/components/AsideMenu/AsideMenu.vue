<template lang="html">
  <transition name="fadeIn">
    <div  class="aside-menu">

      <div class="aside">
        <div class="info">
          <img src="https://microzz.com/img/avatar.jpg" alt="">
          <div class="about">
            <span class="name">microzz</span>
            <span class="level">Lv100</span>
            <span class="sign">
              <i></i>
              签到
            </span>
          </div>
        </div>

        <div class="settings">
          <div class="content">
            <ul>
              <li><i class="skin-icon"></i>我的消息</li>
              <li><i class="skin-icon"></i>会员中心</li>
              <li><i class="skin-icon"></i>商城</li>
              <li><i class="skin-icon"></i>在线听歌免流量</li>
            </ul>
            <ul>
              <li><i class="skin-icon"></i>我的好友</li>
              <li><i class="skin-icon"></i>附近的人</li>
            </ul>
            <ul>
              <li><i class="skin-icon"></i>个性换肤</li>
              <li><i class="aboutme"></i>关于</li>
            </ul>
            <div class="back">
              <i @click.stop.prevent="showAsideMenu" class="icon-back"></i>
            </div>
          </div>

        </div>
      </div>

      <div @click.stop.prevent="showAsideMenu" class="mask"></div>


    </div>
  </transition>

</template>

<script>
export default {
  name: 'AsideMenu',
  computed: {
  },
  methods: {
    showAsideMenu() {
      this.$store.commit('showAsideMenu', false);
    }
  }
}
</script>

<style lang="scss">
.fadeIn-enter-active {
  transition: all .4s ease;
}
.fadeIn-leave-active {
  transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fadeIn-enter, .fadeIn-leave-active {
  transform: translateX(-250px);
  opacity: 0;
}
  .aside-menu {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    // flex-direction: column;
    z-index: 1;
    .aside {
      flex: 6;
    }
    .mask {
      flex: 4;
    }
    .info {
      padding-top: 20px;
      padding-left: 10px;
      padding-bottom: 8px;
      background-color: #B72712;
      box-shadow: 2px 0 10px gray;
      flex: 1;
      img {
        width: 100px;
        height: 95px;
        border-radius: 60px;
      }
      .about {
        position: relative;
        margin-top: 2px;
        span.name {
          color: rgba(255, 255, 255, .8);
          font-size: 1.2rem;
        }
        span.level {
          width: 15px;
          height: 15px;
          border: 1px solid white;
          border-radius: 20px;
          padding: 0 6px;
          color: white;
          font-size: .2rem;
          font-style: italic;
        }
        span.sign {
          position: absolute;
          right: 10px;
          top: 5px;
          border: 1px solid white;
          height: 20px;
          width: 50px;
          border-radius: 10px;
          line-height: 20px;
          text-align: center;
          color: white;
          font-size: .8rem;
        }
      }
    }
    .settings {
      flex: 4.2;
      position: relative;
      height: 79%;
      background: white;
      border-right: 1px solid gray;
      box-shadow: 2px 0 20px gray;

      .content {

        height: 85%;

        .back {
          .icon-back {
            position: absolute;
            right: 3%;
            bottom: 4%;
            display: inline-block;
            background: url('./back.svg') no-repeat;
            width: 30px;
            height: 30px;
            background-size: contain;
          }
        }
      }

      ul:nth-of-type(1) {
        // color: rgba(0, 0, 0, .5);
        padding-top: 20px;
        border-bottom: 6px solid rgba(0, 0, 0, .04);
      }
      ul:nth-of-type(2) {
        // color: rgba(0, 0, 0, .5);
        padding-top: 10px;
        padding-bottom: 5px;
        border-bottom: 6px solid rgba(0, 0, 0, .04);
      }
      ul:nth-of-type(3) {
        padding-top: 15px;
      }
      ul {
        list-style: none;
        padding: 5px 15px;
        li {
          font-size: 1rem;
          margin-bottom: 20px;
          i.skin-icon {
            position: relative;
            top: 2px;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url('./skin.svg') no-repeat;
            background-size: contain;
            margin-right: 4px;
          }
          i.aboutme {
            display: inline-block;
            margin-right: 2px;
            width: 20px;
            height: 20px;
            background: url('./about.svg') no-repeat;
            background-size: contain;
          }
        }
      }

    }
  }
</style>
