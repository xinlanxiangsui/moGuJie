<template>
  <div class="cart-list">
    <cart-list-item v-for="(item,index) in cartList" :item-number="index" :key="index"></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";
import { mapGetters } from "vuex";

export default {
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },
};
</script>
<style lang="scss" scoped>
.cart-list {
  width: 375px;
}
</style>
