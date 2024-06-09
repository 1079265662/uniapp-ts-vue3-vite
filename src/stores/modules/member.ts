import { defineStore } from 'pinia'
import { ref } from 'vue'
// import { StoreType } from './type/stores.d.ts'

// 定义 Store
export const useMemberStore = defineStore(
  'member',
  () => {
    // 会员信息
    const profile = ref<StoreType>()

    // 保存会员信息，登录时使用
    const setProfile = (val: StoreType) => {
      profile.value = val
    }

    // 清理会员信息，退出时使用
    const clearProfile = () => {
      profile.value = undefined
    }

    // 记得 return
    return {
      profile,
      setProfile,
      clearProfile,
    }
  },
  // TODO: 持久化
  {
    // pinia-plugin-persistedstate 持久化设置

    // 网页端设置
    // persist: true,

    // 小程序持久化配置
    persist: {
      // 自定义持久化
      storage: {
        // 获取持久化的值(缓存)
        getItem(key) {
          return uni.getStorageSync(key)
        },
        // 设置持久化的值(缓存)
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
      },
    },
  },
)
