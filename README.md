# custom-webpack-named-plugin

This is a custom module plugin package for webpack. it allows you to command your module name in your own way.this is very useful for module reusability, especially in the production environment.

## Mode of use

```bash
  npm i --save-dev custom-webpack-named-plugin
```

```bash
  yarn add --dev custom-webpack-named-plugin
```
if you use hashedModuleIds of webpack>=4
```bash
  let CustomHashedPlugin = require("custom-webpack-named-plugin").hashedPlugin
  plugins:{
    new CustomHashedPlugin({
      mapping:{
        './src/(\\w+).js':'$1'
      }
    })
    
    new CustomHashedPlugin({
      mapping:{
        './src/index.js':'customName'
      }
    })
  }
  
```

if you use namedModules of webpack>=4
```bash
  let CustomNamedPlugin = require("custom-webpack-named-plugin").namedPlugin
  plugins:{
    new CustomNamedPlugin({
      mapping:{
        './src/(\\w+).js':'$1'
      }
    })
    
    new CustomNamedPlugin({
      mapping:{
        './src/index.js':'customName'
      }
    })
  }
  
```
