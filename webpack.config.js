module.exports = {
    entry: {
        main: "./main.js",
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env"], // 将高版本的 js 语法翻译成低版本
                plugins: [
                  [
                    "@babel/plugin-transform-react-jsx", // 处理 jsx 语法 
                    { pragma: "ToyReact.createElement" },// 插件的配置，方法名称的替换。
                  ],
                ],
              },
            },
          },
        ],
      },
      mode: "development",
      optimization: { minimize: false },
}