import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2add703d = () => interopDefault(import('../pages/customer.vue' /* webpackChunkName: "pages/customer" */))
const _5849fa0d = () => interopDefault(import('../pages/inventory.vue' /* webpackChunkName: "pages/inventory" */))
const _cf73fdc6 = () => interopDefault(import('../pages/login/index.vue' /* webpackChunkName: "pages/login/index" */))
const _6ccd432b = () => interopDefault(import('../pages/supplier.vue' /* webpackChunkName: "pages/supplier" */))
const _b78c40c6 = () => interopDefault(import('../pages/po/order.vue' /* webpackChunkName: "pages/po/order" */))
const _294bdb08 = () => interopDefault(import('../pages/set/Media.vue' /* webpackChunkName: "pages/set/Media" */))
const _5e6d77ea = () => interopDefault(import('../pages/set/toko.vue' /* webpackChunkName: "pages/set/toko" */))
const _2b38e608 = () => interopDefault(import('../pages/so/form.vue' /* webpackChunkName: "pages/so/form" */))
const _8962608c = () => interopDefault(import('../pages/so/order.vue' /* webpackChunkName: "pages/so/order" */))
const _5ea46dd1 = () => interopDefault(import('../pages/po/view/_id.vue' /* webpackChunkName: "pages/po/view/_id" */))
const _6c36ac94 = () => interopDefault(import('../pages/so/view/_id.vue' /* webpackChunkName: "pages/so/view/_id" */))
const _07c05303 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/customer",
    component: _2add703d,
    name: "customer"
  }, {
    path: "/inventory",
    component: _5849fa0d,
    name: "inventory"
  }, {
    path: "/login",
    component: _cf73fdc6,
    name: "login"
  }, {
    path: "/supplier",
    component: _6ccd432b,
    name: "supplier"
  }, {
    path: "/po/order",
    component: _b78c40c6,
    name: "po-order"
  }, {
    path: "/set/Media",
    component: _294bdb08,
    name: "set-Media"
  }, {
    path: "/set/toko",
    component: _5e6d77ea,
    name: "set-toko"
  }, {
    path: "/so/form",
    component: _2b38e608,
    name: "so-form"
  }, {
    path: "/so/order",
    component: _8962608c,
    name: "so-order"
  }, {
    path: "/po/view/:id?",
    component: _5ea46dd1,
    name: "po-view-id"
  }, {
    path: "/so/view/:id?",
    component: _6c36ac94,
    name: "so-view-id"
  }, {
    path: "/",
    component: _07c05303,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
