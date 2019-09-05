### 基于vue-cli3.0以下的脚手架
3.0以下的脚手架，意味着还是用着webpack+vue-loader来搭建构建环境。
#### 步骤如下
``` bash
npm install typescript ts-loader --save-dev
```
如何配置: [ts-loader官方传送门](https://www.npmjs.com/package/ts-loader#appendtssuffixto-regexp-default)，[ts官方传送门](https://www.tslang.cn/docs/handbook/migrating-from-javascript.html)  
简略配置:  
```javascript
entry: {
   app: './src/xxxx.js // 如有变动，则.ts
},
resolve: {
   extensions: ['.js', '.vue', '.json', '.ts'], // 这里加入.ts文件的解析,如果使用了tsx，一并加上
},
 module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
```
TypeScript使用tsconfig.json文件管理工程配置，所以需要在根目录加上这个文件。[ts文档传送门](https://www.tslang.cn/docs/handbook/migrating-from-javascript.html)    
example:  
``` javascript
// tsconfig.json
{
    // 需要编译的文件
    "include": [
      "src/**/*"
    ],
    // 需要忽略编译的文件
    "exclude": [
      "node_modules"
    ],
    // 编译器
    "compilerOptions": {
      // 包含的类型声明文件路径列表
      "typeRoots": [
        "node_modules/@types"
      ],
      // 以严格模式解析
      "strict": true,
      // 允许从没有设置默认导出的模块中默认导入
      "allowSyntheticDefaultImports": true,
      // 启用装饰器
      "experimentalDecorators": true,
      // 禁用函数参数双向协变检查。
      "strictFunctionTypes": false,
      // 允许编译javascript文件
      "allowJs": true,
      // 采用的模块系统
      "module": "esnext",
      // 编译输出目标 ES 版本
      "target": "es5",
      // 如何处理模块
      "moduleResolution": "node",
      // 在表达式和声明上有隐含的any类型时报错
      "noImplicitAny": true,
      // 编译过程中需要引入的库文件的列表。
      "lib": [
        "dom",
        "es5",
        "es6",
        "es7",
        "es2015.promise"
      ],
      "sourceMap": true,
      // 给错误和消息设置样式，使用颜色和上下文。
      "pretty": true
    }
}
```
compilerOptions选项可以按照它给那个列表按需求加入，比如添加一些代码常量检测之类的。
