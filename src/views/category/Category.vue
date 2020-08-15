<template>
  <div class="category" @click="asd">category</div>
</template>

<script>
export default {
  methods: {
    asd() {
      this.$toast.show("asdasd", 2000);
    },
  },
};
</script>

<style>
</style>
