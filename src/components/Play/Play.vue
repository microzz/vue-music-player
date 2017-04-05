<template lang="html">
  <div class="play">
    <div class="header">

    </div>
    <div class="content">

    </div>

    <div class="footer">

    </div>
  </div>
</template>

<script>
export default {
  name: 'play'
}
</script>

<style lang="scss" scoped>
  .play {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: red;
    .header {
      flex: 1;
      background-color: green;
    }
    .content {
      flex: 6;
      background-color: blue;
    }
    .footer {
      flex: 1;
      background-color: red;
    }
  }
</style>
