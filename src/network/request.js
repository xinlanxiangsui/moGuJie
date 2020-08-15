import axios from 'axios'

// 为什么不使用default？
// 为了提高扩展性，可能会导出多个实例
export function request(config) {
  // 1. 创建axios实例（不要使用全局axios）
  const instance = axios.create({
    timeout: 5000
  })

  // 请求拦截
  instance.interceptors.request.use(config => {
    // 拦截成功
    // console.log(config);
    // 拦截后需要返回config，让其继续发送请求
    return config
  }), err => {
    // 拦截失败
    console.log(err);
  }

  // 响应拦截
  instance.interceptors.response.use(res => {
    // 拦截成功后要返回data
    return res.data
  }, err => {
    // 拦截失败
    console.log(err);
  })

  // 返回一个promise
  return instance(config)
}
