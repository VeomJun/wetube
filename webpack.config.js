const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        // This is plug below. 순수하게 추출된 CSS를 불러와 이를 원하는 곳으로 보냄.
        use: ExtractCSS.extract([
          {
            // It makes webpack understand Css
            loader: "css-loader"
          },
          {
            // It takes Css and translate it with plug that we give him.(호환성 관련 문제 해결)
            // 해당하는 각각의 브라우저에서 사용되는 문법으로 CSS를 변환시켜줌. EX) -webkit- ...
            loader: "postcss-loader",
            // It needs to use 'autoprefixer'
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              }
            }
          },
          {
            // It changes Scss to Css
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js"
  },
  // plugins를 plugin이라고 써서 한참 헤맸잖아!!!!!!!
  plugins: [new ExtractCSS("styles.css")]
};
module.exports = config;
