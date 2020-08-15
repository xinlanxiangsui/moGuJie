<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>

    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  computed: {
    isActive() {
      // home -> item1(/home) = true
      // home -> item2(/category) = false
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-bar-item {
  flex: 1;
  color: #222;
  text-align: center;
  font-size: 0;
  img {
    width: 21px;
    height: 21px;
    margin-bottom: 3px;
  }
  div {
    font-size: 16px;
  }

  // 不希望写死颜色，希望别人用的时候能动态决定颜色
  // .active {
  //   color: red;
  // }
}
</style>
