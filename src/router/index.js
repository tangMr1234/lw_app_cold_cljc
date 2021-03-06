import Vue from 'vue'
import Router from 'vue-router'
const Login = resolve => { require.ensure([], () => { resolve(require('@/views/Layout/Login')) }) } // 登录
const Home = resolve => { require.ensure([], () => { resolve(require('@/views/Home')) }) } // 主页面框架
const TabHome = resolve => { require.ensure([], () => { resolve(require('@/views/TabHome')) }) } // tab页面框架
const Index = resolve => { require.ensure([], () => { resolve(require('@/views/Layout/Index')) }) } // 首页

const Map = resolve => { require.ensure([], () => { resolve(require('@/views/Map/Map')) }) } // 所有车辆位置地图
const PointMap = resolve => { require.ensure([], () => { resolve(require('@/views/Map/PointMap')) }) } // 单个车辆位置地图框架
const PMap = resolve => { require.ensure([], () => { resolve(require('@/views/Map/PMap')) }) } // 单个车辆位置地图

const List = resolve => { require.ensure([], () => { resolve(require('@/views/List/List')) }) } // 车辆信息列表
const Curve = resolve => { require.ensure([], () => { resolve(require('@/views/Curve/Curve')) }) } // 温度曲线
const Grid = resolve => { require.ensure([], () => { resolve(require('@/views/Grid/Grid')) }) } // 温度表格
const Details = resolve => { require.ensure([], () => { resolve(require('@/views/Details/Details')) }) } // 装备详情
const NotFound = resolve => { require.ensure([], () => { resolve(require('@/views/Layout/404')) }) } // 错误404

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '错误界面',
      hidden: true
    },
    {
      path: '*',
      name: '404',
      hidden: true,// 隐藏，在菜单中不显示
      redirect: {path: '/404'}
    },
    {
      path: '/',
      name: '主页面',
      component: Home,
      redirect: {path: '/index'},
      children: [
        {path: '/index', component: Index, name: '车辆监测'}
      ]
    },
    {path: '/map', component: Map, name: '所有车辆位置'},
    {path: '/pointmap', component: PointMap, name: '车辆位置'},
    {path: '/pmap', component: PMap, name: '车辆位置图'},
    {path: '/list', component: List, name: '车辆信息', meta:{ link: '#/details' }},
    {
      path: '/details',
      redirect: {path: '/details/detail'},
      NewRouter: 'details',
      component: TabHome,
      name: '实时温湿度详情',
      children: [
        {path: '/details/detail', component: Details, name: '车辆详情'},
        {path: '/details/curve', component: Curve, name: '温度曲线'},
        {path: '/details/grid', component: Grid, name: '温度列表'}
      ]
    }
  ]
})
