<template>
  <div class="pagew-content-scroll">
    <el-backtop target=".pagew-content-scroll"></el-backtop>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BackTop",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style  scoped>
.pagew-content-scroll {
  /* 必须撑满整个屏幕 */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
}
</style>