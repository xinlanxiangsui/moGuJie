<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <MainTabBar />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabbar/MainTabBar";
export default {
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "./assets/css/base.css";
* {
  font-size: 26px;
}
</style>
