import Vue from 'vue'
import kalkulator from './kalkulator.vue'
import VueSlideBar from 'vue-slide-bar'

Vue.component('vue-slide-bar', VueSlideBar)

new Vue({
    el: '#mbank-app',
    render: h => h(kalkulator)
})