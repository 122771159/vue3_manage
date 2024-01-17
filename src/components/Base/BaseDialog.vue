<template>
  <div class="dialog w-full h-full" style="position: absolute; margin: 0; padding: 0" :style="computedZIndexStyles">
    <el-dialog v-bind="$attrs" :style="computedMargin">
      <slot></slot>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    margin: {
      type: Array,
      required: false,
      default: [0],
    },
  },
  created() {
    // console.log(this.$attrs.modelValue);
    console.log(this.$slots);
  },
  computed: {
    computedZIndexStyles() {
      return {
        'z-index': this.$attrs.modelValue ? 1000 : -1000,
        // 其他样式属性
      };
    },
    computedMargin() {
      return {
        margin: this.margin.join(' '),
      };
    },
  },
  watch: {
    // $attrs: {
    //   handler(newValue, oldValue) {
    //     console.log(newValue.modelValue);
    //     // 在 $attrs 变化时执行逻辑
    //   },
    //   deep: true, // 如果 $attrs 内部有对象或数组，需要设置 deep: true
    // },
    // // 其他 watch 配置
  },
};
</script>
<style scoped lang="scss">
.dialog {
  :deep(.el-dialog) {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  :deep(.el-overlay-dialog) {
    position: static;
    height: 100%;
  }
  :deep(.el-overlay) {
    position: static;
    background-color: #fff;
  }
  :deep(.el-dialog__body) {
    padding: 0;
    height: calc(100% - 54px);
  }
}
</style>
