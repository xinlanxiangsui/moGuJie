<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <img :src="item.image" alt />
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss">
.recommend {
  display: flex;
  width: 100%;
  .recommend-item {
    flex: 1;
    text-align: center;
    font-size: 12px;
    padding: 12px 0;
    border-bottom: 7px solid #f3f3f3;
    img {
      width: 68px;
      height: 68px;
    }
    div {
      font-size: 14px;
    }
  }
}
</style>
