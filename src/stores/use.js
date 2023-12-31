import { defineStore } from "pinia";
import {ref} from 'vue'
import {loginAPI } from '@/apis/use'
import { useCartStore } from "./carStore";
import {mergeCartAPI} from '@/apis/cart'

export const useUserStore = defineStore('use',()=>{
    const CartStore = useCartStore()
    //1.定义管理用户数据的state
    const useInfo = ref({})
    //2.定义获取接口数据的action函数
    const getUseInfo = async ({account,password})=>{
        const res = await loginAPI({account,password})
        useInfo.value = res.result
        // console.log(res);
        //合并购物车操作  有bug，不能删除购物车数据
        await mergeCartAPI(CartStore.cartList.map(item =>{
            return{
                //下面三个数据来自cartStore.cartList (本地购物车数据)
                skuId:item.skuId,
                selected:item.selected,
                count:item.count
            }
        }))
        CartStore.upDateNewList()
    }

    //3.退出时清除用户信息和清除购物车数据
    const clearUserInfo = ()=>{
        useInfo.value = {}
        CartStore.clearCart()  //可能会清除所有数据，服务器与本地的购物车数据都清除了 //登录时重新获取数据列表
    }
    //4.以对象的格式把state和action return
    return{
        useInfo,
        getUseInfo,
        clearUserInfo
    }
},
    {
    persist: true,   //pinia数据持久化插件配置
})