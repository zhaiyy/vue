<template>
  <div id="app">
    storeName {{ storeName }} {{myName}}
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  computed: {
    storeName() {
      return this.$store.state.storeName
    },
    myName() {
      return this.$store.getters.myName
    }
  },

  mounted() {
    console.log('moduleA', this.$store.state.moduleA.state)
    window.setTimeout(() => {
      this.$store.commit('updateStoreName', 'mutations')
    }, 1000)
    this.$store.dispatch('updateNameAction', 'action')
  },

  methods: {
 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
