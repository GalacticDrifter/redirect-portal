import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Signin from '@/components/User/Signin'
import DataGrid from '@/pages/DataGrid'
import AuthGuard from './auth-guard'
Vue.use(Router)

export default new Router({
  routes: [{
        path: '',
        name: 'Home',
        component: Home
    }, {
        path: '/admin',
        name: 'DataGrid',
        component: DataGrid,
        beforeEnter: AuthGuard
    }, {
        path: '/login',
        name: 'Signin',
        component: Signin
      }
    ],
    mode: 'history'
})
