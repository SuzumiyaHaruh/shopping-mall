// 打开与关闭toast
// export function toastFn(_this, msg, type) {
//     _this.$store.dispatch("changeToastAsync",{msg,type});
// }
export function MessageFn(_this, msg, type){
    _this.$message({
        message: msg,
        type: type,
        duration:2000
    });
}

