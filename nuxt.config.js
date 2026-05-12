const config = {
  mode: "universal",
  head: {
    title: "MaxonERP",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ]
  },
  css: ["element-ui/lib/theme-chalk/index.css"],
  plugins: ["@/plugins/element-ui"],
  modules: ["@nuxtjs/axios", "@nuxtjs/toast", "@nuxtjs/auth-next"],
  axios: {
    proxy: true
  },
  proxy: {
    "/api": {
      target: "http://demo.maxonerp.com/index.php/",
      pathRewrite: { "^/api": "/" }
    }
  },
  auth: {
    strategies: {
      local: {
        token: {
          property: "token.accessToken",
          global: true,
          required: true,
          type: "Bearer"
        },
        user: {
          property: "user"
        },
        endpoints: {
          login: { url: "/api/login", method: "post" },
          logout: { url: "/api/logout", method: "post" },
          user: { url: "/api/user", method: "get" }
        }
      }
    },
    redirect: {
      login: "/login",
      logout: "/",
      home: "/"
    }
  },
  build: {
    transpile: [/^element-ui/]
  }
};

module.exports = config;
