<template>
  <template v-for="item in routerList" :key="item.path">
    <!-- 一级菜单 -->
    <el-menu-item v-if="(item.isshow && item.children.length === 0) || (item.children.length === 1 && !item.children[0].isshow)" :index="item.meta.fullPath">
      <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
    <!-- 二级菜单 -->

    <el-sub-menu v-else v-if="item.isshow" :index="item.meta.fullPath">
      <template #title>
        <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>

        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归 -->
      <menu-item :router-list="item.children" />
    </el-sub-menu>
  </template>
</template>
<script setup>
defineProps({
  routerList: {
    type: Array,
    default: () => [],
  },
});
</script>
<style scoped lang="scss"></style>
