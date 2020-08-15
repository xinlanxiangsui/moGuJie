<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in title"
      class="tab-control-item"
      :class="{active:index==currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style lang="scss">
.tab-control {
  display: flex;
  text-align: center;
  background-color: #fff;
  // 因为bscroll组件时脱离标准流的，想要在它上面，tabControl也要脱标，因此添加一个相对定位
  position: relative;
  z-index: 3;
  .tab-control-item {
    flex: 1;

    span {
      font-size: 20px;
    }
  }
}
.active {
  color: deeppink;
  span {
    padding-bottom: 3px;
    border-bottom: 2px solid deeppink;
  }
}
</style>
