import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import store from '@/store';
// import { layer } from '@layui/layui-vue';
// import { localStorage } from '@/utils/storage';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000, // 请求超时时间：50s
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    const { isLogin, tokenObj } = toRefs(store.user.useUserStore());
    if (isLogin.value) {
      // 授权认证
      config.headers['Authorization'] = tokenObj.value.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    console.log(response.headers);
    // 获取相应的状态码
    const { tokenObj } = toRefs(store.user.useUserStore());
    if (response.headers?.authorization !== undefined) {
      tokenObj.value.token = response.headers.authorization;
    }
    return response.data;
  },
  (error) => {
    const { status, statusInfo } = error.response.data;

    // 未认证
    if (status >= -10020 && status <= -10010) {
      handleError();
    } else {
      ElMessage({
        message: statusInfo?.message ?? '系统错误',
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(statusInfo?.message ?? 'Error'));
    }
  },
);

// 统一处理请求响应异常
function handleError() {
  const { isLogin, logout } = store.user.useUserStore();

  if (isLogin) {
    ElMessageBox.confirm('您的登录账号已失效，请重新登录', {
      confirmButtonText: '再次登录',
      cancelButtonText: '取消',
      type: 'warning',
    }).finally(() => {
      logout();
    });
  }
}

// 导出实例
export default service;
