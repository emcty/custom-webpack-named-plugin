/*
* @params {Object}
* @options mapping {Object}
*/
"use strict";

class customNamedModulesPlugin {
  constructor(options) {
    this.options = options || {};
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
            if (this.options.mapping) {
              for (let rule in this.options.mapping) {
                if (new RegExp(rule).test(module.id)) {
                  module.id = RegExp[this.options.mapping[rule]];
                  break;
                } else if (rule == module.id) {
                  module.id = this.options.mapping[rule];
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
