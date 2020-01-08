// 是否为生产环境
// const isProduction = process.env.VUE_APP_ENV_MODE !== '1'
module.exports = {
    css: {
        sourceMap: true,
        loaderOptions: {
            sass: {
                data: `
                @import "@/assets/styles/variable.scss";
              `
            }
        }
    },
    devServer: {
        proxy: {
            '^/myApi': {
                target: 'http://testapi.gvrbox.com',
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/myApi': '' // 规定请求地址以什么作为开头
                }
            }
        }
    },
}