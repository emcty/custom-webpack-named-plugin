/*
* @params {Object}
* @options mapping {Object}
*/
"use strict";

class customNamedModulesPlugin {
  constructor(options) {
    this.options = {
      mapping: {type: 'String',match:{}}
    };
    this.options = Object.assign(this.options,options);
  }
  apply(compiler) {
    compiler.plugin("compilation", (compilation) => {
      compilation.plugin("before-module-ids", (modules) => {
        modules.forEach((module) => {
          if (module.id === null && module.libIdent) {
            module.id = module.libIdent({
              context: this.options.context || compiler.options.context
            });
            //rename module name
            let {type,match} = this.options.mapping;
            for (let rule in match) {
              if(type === 'String'){
                if(rule == module.id){
                  module.id = match[rule];
                  break;
                }
              }else if(type === 'regExp'){
                if (new RegExp(rule).test(module.id)) {
                  module.id = RegExp[match[rule]];
                  break;
                }
              }
            }
          }
        });
      });
    });
  }
}

module.exports = customNamedModulesPlugin;
