## dva-host

# 前端环境搭建

1.dva 安装
npm install dva-cli -g
2. 初始化项目
dva new dva-quickstart
cd dva-quickstart
npm start
3.引入antd
npm install antd babel-plugin-import --save
4.按需加载，找到根目录下面的.webpackrc文件，并在文件中添加插件配置
"extraBabelPlugins": [
    ["import", { "libraryName": "antd", "style": "css" }]
]
