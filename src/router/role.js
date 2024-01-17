//角色文件
import router from '@/router';
import store from '@/store';
import { ElMessage } from 'element-plus';
//白名单
const whiteList = ['/login', '/register'];
let hasRouter = false;
router.beforeEach(async (to, from, next) => {
  let useUserStore = store.user.useUserStore();
  const { logout } = useUserStore;
  let { isLogin, routerList } = toRefs(useUserStore); // 响应式
  if (isLogin.value) {
    // 已经登录后的操作
    if (to.path === '/login') {
      if (to.fullPath.startsWith('/login?redirect=')) {
        let lastPath = to.fullPath.replace('/login?redirect=', '');
        next({ path: lastPath }); // 跳转到上次退出的页面
      } else {
        next({ path: '/' }); // 跳转到首页
      }
    } else {
      try {
        if (hasRouter) {
          next(); // 放行
        } else {
          routerList.value.forEach((e) => {
            router.addRoute(e);
          }); // 路由添加进去之后不会及时更新，需要重新加载一次
          // console.log('全部路由数据：', router.getRoutes());

          hasRouter = true;
          next({ ...to, replace: true });
        }
      } catch (error) {
        ElMessage.error('错误：' + error || 'Has Error');
      }
    }
  } else {
    // 未登录

    if (whiteList.indexOf(to.path) !== -1) {
      next(); // 放行 -- 可以访问白名单页面(eg: 登录页面)
    } else {
      next(`/login?redirect=${to.path === '/' ? '/user/index' : to.path}`); // 无权限 & 白名单页面未配置  =》 跳转到登录页面
    }
  }
});
router.afterEach(() => {
  // console.log('路由跳转完成');
});
