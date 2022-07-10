<template>
  <el-breadcrumb class="bread" separator="/">
    <el-breadcrumb-item class="myColor"  :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="(item,index) in breadArr" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: `Breadcrumb`,
  props:['breadArr'],
}
</script>

<style lang="less" scoped>
.bread{
  padding: 15px;
  .myColor /deep/ .el-breadcrumb__inner {
    &:hover{
      color:#0A328E
    }
  }
}
</style>
