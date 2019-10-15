# dva-host

## 前端环境搭建

#### 1.dva 安装 <br>
npm install dva-cli -g <br>
#### 2. 初始化项目 <br>
dva new dva-quickstart <br>
cd dva-quickstart <br>
npm start <br>
#### 3.引入antd <br>
npm install antd babel-plugin-import --save <br>
#### 4.按需加载，找到根目录下面的.webpackrc文件，并在文件中添加插件配置 <br>
"extraBabelPlugins": [
    ["import", { "libraryName": "antd", "style": "css" }]
] <br>
