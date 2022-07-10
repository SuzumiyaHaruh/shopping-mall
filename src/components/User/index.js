//退出登录
export function loginOutFn(_this) {
    localStorage.removeItem('x-auth-token')
    sessionStorage.clear()
    setTimeout(() => {
        _this.$router.push('/home');
    }, 2000)
}
