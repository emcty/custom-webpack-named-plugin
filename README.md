# custom-webpack-named-plugin

This is a custom module plugin package for webpack. it allows you to command your module name in your own way.this is very useful for module reusability, especially in the production environment.

## Mode of use

```bash
  npm i --save-dev custom-webpack-named-plugin
```

```bash
  yarn add --dev custom-webpack-named-plugin
```
### hashedPlugin
if you use hashedModuleIds of webpack>=4 or HashedModuleIdsPlugin of webpack<4
```bash
  let CustomHashedPlugin = require("custom-webpack-named-plugin").hashedPlugin
```
the default type of mapping object is String
**webpack.config.js**
```bash
  plugins: [
    new CustomHashedPlugin({
      mapping:{
        type: 'String',
        match: {
          './src/index.js':'customName'
        }
      }
    })
  ]
  
```
### namedPlugin
if you use namedModules of webpack>=4 or Namedmodulesplugin of webpack<4
```bash
  let CustomNamedPlugin = require("custom-webpack-named-plugin").namedPlugin
```
**webpack.config.js**

```bash
  plugins: [
    new CustomNamedPlugin({
      mapping:{
        type: 'String',
        match: {
          './src/index.js':'customName'
        }
      }
    })
  ] 

```
it also allows you use RegExp type
** webpack.config.js **
```bash
  plugins: [
    new CustomNamedPlugin({
      mapping:{
        type: 'RegExp'
        './src/(\\w+).js':'$1'
      }
    })
  ]

```
