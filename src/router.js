import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
Vue.use(Router)
const routes = [
	{
		path: '/',
		component: Home,
		name: 'home'
	}
]

export default new Router({
	routes
})
