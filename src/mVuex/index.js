import Vue from 'vue'

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
        this._s = new Vue({
            data:{
                // 只有data中的数据才是响应式
                state:options.state
            }
        })
    
        this.getters = {}
        this.mutations = {}
        this.actions = {}
        this.modules = {}
        // 初始化getters
        this.defineGetters(options)

        // 初始化 Mutations
        this.defineMutations(options)

        // 初始化actions 
        this.defineActions(options)

        // 初始化 modules
        this.defineModules(options)
       
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
    defineMutations(options) {
        const mutations = options.mutations || {}
        Object.keys(mutations).forEach(mutation => {
                this.mutations[mutation] = (params) => {
                    mutations[mutation](this.state, params)
                }
        })
    }
    defineActions(options) {
        const actions = options.actions || {}
        Object.keys(actions).forEach(action => {
            this.actions[action] = (params) => {
                actions[action](this, params)
            }
        })

    }

    defineModules(options) {
        const modules = options.modules || {}
        Object.keys(modules).forEach(module => {
            this.state[module] = new Store(modules[module])
        })

    }
    dispatch = (type, params)=>{
        this.actions[type](params)
    }
    commit = (type, params) =>{
        this.mutations[type](params)
    }

}
export default {
    install,
    Store
}