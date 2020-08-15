<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goodsItem="item">
      {{item}}
      {{goods}}
    </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style lang="scss">
.goods-list {
  word-wrap: break-word;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10px;
}
</style>
