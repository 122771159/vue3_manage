import { defineStore } from 'pinia';

export const useSystemStore = defineStore('system', () => {
  const isMenuExpand = ref(false); //变量名写反了，实际上是是否是收缩的意思，主要用在pc
  const isShrink = ref(false); //是否收缩，left-200收缩的意思  mobile
  const isMenuShrink = ref(false);
  const isMobileMenuShrink = ref(true);
  const windowWidth = ref(window.innerWidth);
  const menuIcon = ref('expand');
  function closeMenu() {
    isMenuExpand.value = true;
  }
  function openMenu() {
    isMenuExpand.value = false;
  }
  function $reset() {
    isMenuExpand.value = false;
    isShrink.value = false;
  }
  return { isMenuExpand, closeMenu, openMenu, isShrink, $reset, isMenuShrink, isMobileMenuShrink, windowWidth, menuIcon };
});
