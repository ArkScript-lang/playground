import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import i18n from '@/plugins/i18n'

Vue.config.productionTip = false

const router = new VueRouter({
    routes: [
        {path: '/pages/:app_path*', component: App}
    ]
});

new Vue({
    vuetify,
    router,
    render: h => h(App),
    i18n
}).$mount('#app')
