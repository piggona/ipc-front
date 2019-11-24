module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  transpileDependencies: [/\bvue-awesome\b/],
  devServer: {
    proxy: {
      "/ipd": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path
              .split("/ipd/")[1]
              .split("/")
              .join("_");
            const file = name.split("_")[0];
            const detail = req.path.split(file)[1];
            const mock = require(`./mock/${file}`);
            const result = mock(req.method, detail);
            delete require.cache[require.resolve(`./mock/${file}`)];
            return res.send(result);
          }
          return false;
        }
      }
    }
  }
};
