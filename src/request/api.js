import request from "@/request/request";
import qs from "qs";
// 接口文档已经告诉接口的Content-Type值为：application/x-www-form-urlencoded这个的，请求的参数需要经过qs.stringify转换

// 在axios中get请求的形参必须是params，post无所谓

// 精品推荐
export const JingpinApi = () => request.get("/products/recommend")

// 热门兑换
export const HotApi = () => request.get("/products/hot")

// 发送注册短信验证码( npm i qs 或 yarn add qs )
export const GetCodeApi = (params) => request.post("/sendSMS", qs.stringify(params))

// 手机号验证码登录(含注册)
export const LoginApi = (params) => request.post("/phoneRegin", qs.stringify(params))


// 获取用户信息
export const UserInfoApi = () => request.get("/shop/userProfiles")

// 微信扫码登录
export const WeixinLoginApi = (params) => request.post(`/wechatUsers/PCLogin`, qs.stringify(params));

// 手机绑定微信
export const BindWechatApi = (params) => request.post("/wechatUsers/binding", qs.stringify(params))

// 解绑微信(登录状态下)
export const UnBindWechatApi = () => request.put("/wechatUsers/unbindingWeChat")

// 商品页数据请求
export const GoodsDataApi = (params) => request.get("/products", {params})

// 商品详情  `/products/${params.id}`
export const GoodsDetailsApi = (params) => request.get(`/products/${params.id}`)

// 加入到购物车
export const AddToCartApi = (params) => request.post("/shop/carts/add", qs.stringify(params))

// 查看购物车
export const CartDataApi = () => request.get("/shop/carts")

// 购物车删除商品
export const CartDelApi = (params) => request.delete(`/shop/carts?productIds=${params.id}`)

