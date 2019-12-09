import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/search",
      component: () =>
        import(/* webpackChunkName: "ipc" */ "./layout/SearchLayout"),
      children: [
        {
          path: "/search/basic",
          name: "searchPage",
          component: () =>
            import(/* webpackChunkName: "ipc" */ "./views/Search/Basic"),
          meta: { requiresAuth: false}
        },
        {
          path: "/search/detail",
          name: "searchDetail",
          component: () =>
            import(/* webpackChunkName: "ipc" */ "./views/Search/Detail"),
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "ipc" */ "./layout/BasicLayout"),
      children: [
        {
          path: "/",
          redirect: "/search/basic"
        },
        {
          path: "/analysis",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/analysis/patent",
              name: "patentAnalysis",
              component: () =>
                import(/* webpackChunkName: "ipc" */ "./views/Analysis/Patent"),
              meta: { requireAuth: false }
            },
            {
              path: "/analysis/fund",
              name: "fundAnalysis",
              component: () =>
                import(/* webpackChunkName: "ipc" */ "./views/Analysis/Fund"),
              meta: { requireAuth: false }
            }
          ]
        }
      ]
    },
    {
      path: "*",
      name: "404",
      component: () => import(/* webpackChunkName: "ipc" */ "./views/404"),
      meta: { requireAuth: false }
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  var ca = document.cookie.split(";");
  console.log("getAuth:", ca);
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf("supreme=") == 0)
      store.state.userInfo.isSupreme = c.substring(
        "supreme=".length,
        c.length
      );
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.userInfo.isSupreme) {
      next({
        path: '/'
      })
    }else {
      next();
    }
  }else {
    next()
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
