<template lang="html">
  <div :style="{backgroundColor: skinColor}" class="header">
    <div class="name">
      <span @click="showAsideMenu(true)" class="func"><i class="func-icon"></i></span>
      <p>云音乐</p>
      <span class="search"><i @click="toSearch" class="search-icon"></i></span>
    </div>
    <div class="tab">
      <div v-bind:class="{link: linkBorderIndex==1}" class="item">
        <router-link to="/music-list">我的</router-link>
      </div>
      <div v-bind:class="{link: linkBorderIndex==2}" class="item">
        <router-link to="/find">发现</router-link>
      </div>
      <div v-bind:class="{link: linkBorderIndex==3}" class="item">
        <router-link to="/social">一个</router-link>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'header',

  data() {
    return {
      index: ''
    };
  },
  computed: {
    linkBorderIndex() {
      return this.$store.state.linkBorderIndex;
    },
    skinColor() {
      return this.$store.state.skinColor;
    }
  },
  methods: {
    toSearch() {
      this.$router.push('/find');
    },
    showAsideMenu(flag) {
      this.$store.commit('showAsideMenu', flag);
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    background-color: #B72712;
    color: white;
    flex: 1;
    width: 100%;

    .name {
      display: flex;
      justify-content: space-between;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, .2);

      span.func {
        flex: 1;
        position: relative;

        i {
          display: inline-block;
          position: absolute;
          width: 20px;
          height: 20px;
          left: 15px;
          bottom: 0;
          background: url(./func.svg) no-repeat;
          background-size: contain;
          cursor: pointer;

        }
      }
      p {
        flex: 1;
      }
      span.search {
        position: relative;
        flex: 1;

        i {
          display: inline-block;
          position: absolute;
          width: 20px;
          height: 20px;
          right: 15px;
          bottom: 0;
          background: url(./search.svg) no-repeat;
          background-size: contain;
          cursor: pointer;
        }
      }
    }

    .tab {
      display: flex;
      border-bottom: 1px solid #9E9E9E;

      a {
        display: inline-block;
        width: 50%;
      }
      a::after {
        background-color: rgba(255, 255, 255, .2);
        height: 1px;
        bottom: -2px;
      }

      .item {
        display: inline-block;
        flex: 1;
        text-align: center;
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .link {
      font-weight: bold;
      color: #BDBDBD;
      border-bottom: 1px solid #E0F2F1;
    }

  }
</style>
