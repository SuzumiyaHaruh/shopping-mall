<template>
  <div class="toast">
    <i :class="$store.state.toastType==='success'?'iconfont icon-toast_chenggong'
    :($store.state.toastType==='danger'?'iconfont icon-toast-shibai_huaban':
    'iconfont icon-toast-jinggao')"></i>
    <span>{{ $store.state.toastMsg }}</span>
  </div>
</template>

<script>
export default {
  name: `Toast`
}
</script>

<style lang="less" scoped>
@import "https://at.alicdn.com/t/font_2730880_ylrio3ahhx.css";

.toast {
  position: fixed;
  margin-top: 50px;
  padding: 10px 20px;
  background:#0A328E ;
  display: flex;
  color: #FFFFFF;
  justify-content: center;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 15px;
  z-index: 22;

  .iconfont {
    margin-right: 10px;
  }

  .icon-toast-shibai_huaban {
    color: red;
  }

  .icon-toast_chenggong {
    color: white;
  }

  .icon-toast-jinggao {
    color: orange;
  }
}
</style>
