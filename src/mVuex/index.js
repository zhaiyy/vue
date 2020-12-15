
const  install = (_Vue)=> {
    const Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options && this.$options.store){
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store 
            }
        }
    })

}
class Store {
    constructor(options) {
        this.state = options.state
        this.getters = {}
        // 初始化getters
        this.defineGetters(options)
       
    }
    defineGetters(options) {
        const getters = options.getters || {}
        Object.keys(getters).forEach(getter => {
            Object.defineProperty(this.getters, getter, {
                get() {
                    return getters[getter](options.state)
                }
            })
        })
    }

}
export default {
    install,
    Store
}