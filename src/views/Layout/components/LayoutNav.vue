<template>
 <nav class="app-topnav">
    <div class="container">
        <ul>
            <!-- 多模板渲染 区分登录状态和非登录状态 -->
            <!-- 思路：登录时显示第一块，非登录时显示第二块  是否有token -->
            <template v-if="useStore.useInfo.token">
             <li><a href="javascript:;"><i class=" iconfont icon-denglu"></i>{{ useStore.useInfo.account }}</a></li>
             <li>
            <el-popconfirm  @confirm="confirm" title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                    <a href="javascript:;">退出登录</a>
                </template>
                </el-popconfirm>
            </li> 
            <router-link  to="/member/Order"><li><a href="javascript:;" >我的订单</a></li></router-link>   
            <li><a href="javascript:;">会员中心</a></li>
            </template>
            <template v-else>
              <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
              <li><a href="javascript:;">帮助中心</a></li>
              <li><a href="javascript:;">关于我们</a></li>
            </template>
        </ul>
    </div>
 </nav>
</template>

<script setup>
import  { useUserStore } from '@/stores/use'
import { useRouter } from 'vue-router';
const useStore = useUserStore()
const router = useRouter()

const confirm = ()=>{
  //退出登录业务逻辑实现
  //1.清除用户信息 触发pinia里面的action函数
  useStore.clearUserInfo()
  //2.跳转到登录页
  router.push('/Login')
}

</script>

<style scoped lang="scss">
.app-topnav {
  background: #333;

  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;

    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>