const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',  // Asegura que se inicie en localhost
    port: 8080,         // Establece el puerto a 8080
    open: true,         // Abre el navegador automáticamente
  },
})
