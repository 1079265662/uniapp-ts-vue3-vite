/**
 * 添加请求拦截器
 * 拦截 request的请求
 * 拦截uploadFile的文件上传
 *
 *
 * TODO:
 *  1. 拼接api的地址
 *  2. 设置请求超时
 *  3. 设置小程序请求头
 *  4. 接口添加token
 */
// 导入用户信息
import { useMemberStore } from '@/stores/index'
// 开发环境
const devBaseUrl = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'
// 生产环境
const prodBaseUrl = 'https://pcapi-xiaotuxian-front.itheima.net'

// 构造一个拦截器
const HttpInterceptor = {
  // 设置拦截前出发
  invoke(options: UniApp.RequestOptions) {
    // 1.处理非完整地址
    if (!options.url.startsWith('http')) {
      // 非完整地址
      options.url = devBaseUrl + options.url
    }

    // 2. 添加小程序的请求标头
    options.header = {
      // 保留原始参数
      ...options.header,
      'source-client': 'miniapp',
    }

    // 3.设置请求超时
    if (options.timeout === undefined) {
      options.timeout = 30000
    }

    // 4. 添加token
    const menberStore = useMemberStore()
    const token = menberStore.profile?.token
    // 如果存在token
    if (token) {
      // 塞到header中
      options.header.Authorization = token
    }
  },
}

// 添加uniapp的请求拦截器 request设置拦截类型
uni.addInterceptor('request', HttpInterceptor) //request类型是 指定拦截uni.request()网络请求

// 设置uploadFile的拦截器
uni.addInterceptor('uploadFile', HttpInterceptor) //uploadFile类型是 指定拦截uni.uploadFile()上传文件
