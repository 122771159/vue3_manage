<template>
  <div class="w-full h-full container">
    <div class="tab-left" @click="scrollLeft">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="tab-left" style="left: 40px" @click="addItem">add</div>
    <div ref="tabs" class="tabs">
      <div ref="tab" class="tab" v-for="item in all" @click="clickTab($event, item.left)">
        <div style="white-space: nowrap">
          <span style="padding-right: 5px; font-size: 14px; white-space: nowrap">{{ item.name }}</span>
          <el-icon size="12" class="tab-close" style="color: #1e9fff; height: 100%"><Close /></el-icon>
        </div>
      </div>
    </div>
    <div class="tab-right" @click="scrollRight">
      <el-icon><ArrowRight /></el-icon>
    </div>
  </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();
const tabs = ref();
const tab = ref();
const all = reactive([]);
const scrollLeft = () => {
  slowScroll(tabs.value, -100, 80);
};
const scrollRight = () => {
  slowScroll(tabs.value, 100, 80);
};
const addItem = () => {
  all.push({
    name: generateRandomString(4),
    left: 0,
  });
  nextTick(() => {
    let length = tab.value.length - 1;
    const lastTab = tab.value[length];
    const left = lastTab.offsetLeft;
    slowScrollPoint(tabs.value, left, 80);
    all[length].left = left;
  });
};
function slowScroll(container, distance, interval) {
  let scrollAmount = 0;
  let step = distance / interval;
  // console.log(step);
  const scrollInterval = setInterval(function () {
    container.scrollLeft += step;
    scrollAmount += step;

    if (Math.abs(scrollAmount) >= Math.abs(distance)) {
      clearInterval(scrollInterval);
    }
  }, 1);
}
const scrollInterval = ref(null);
function slowScrollPoint(container, point) {
  if (scrollInterval.value != null) {
    return;
  }
  const scrollLeft = container.scrollLeft;
  let distance = 0;
  let step = 10;
  if (scrollLeft > point) {
    distance = point - scrollLeft - 20;
    step = -step;
  } else if (scrollLeft < point) {
    distance = point - scrollLeft + 20;
  } else {
    return;
  }
  let scrollAmount = 0;
  scrollInterval.value = setInterval(function () {
    container.scrollLeft += step;
    scrollAmount += step;
    if (Math.abs(scrollAmount) >= Math.abs(distance)) {
      clearInterval(scrollInterval.value);
      scrollInterval.value = null;
    }
  }, 5);
}
const clickTab = (event, left) => {
  slowScrollPoint(tabs.value, left);
  // console.log(tabs.value.offsetWidth);
  const rect = event.target.getBoundingClientRect();
  const distanceToViewport = {
    top: rect.top,
    left: rect.left,
    bottom: rect.bottom,
    right: rect.right,
  };
  // console.log(distanceToViewport);
};
function generateRandomString(length) {
  const characters = '阿达是你看你大红大为惊恐啊实打实觉得你撒可见度那是看见你的就是卡卡的极为艰苦的环境卡位很多客户速度的';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
</script>
<style scoped lang="scss">
$len: 80px;
.container {
  position: relative;
  .tabs {
    position: absolute;
    left: $len;
    right: $len;
    overflow-x: hidden;
    height: 32px;
    display: flex;
    align-content: center;
    .tab {
      color: #595959;
      cursor: pointer;
      height: 32px;
      border-radius: 4px;
      background-color: #fff;
      padding: 6px 10px;
      display: flex;
      align-content: center;
      justify-content: space-between;
      margin-right: 5px;
    }
  }
  .tab-left {
    position: absolute;
    left: 0;
    height: 32px;
    width: 40px;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
  }
  .tab-right {
    position: absolute;
    right: 0;
    height: 32px;
    width: $len;
    line-height: 32px;
    text-align: center;
    cursor: pointer;
  }
}
.tab-close:hover {
  color: red;
}
</style>
