/*

*/
"use strict";
const createHash = require("crypto").createHash;

class customHashedModuleIdsPlugin {
  constructor(options) {
    this.options = Object.assign({
      hashFunction: "md5",
      hashDigest: "base64",
      hashDigestLength: 4,
      mapping: {type: 'String',match:{}}
    }, options);
  }

  apply(compiler) {
    const options = this.options;
    compiler.plugin("compilation", (compilation) => {
      const usedIds = new Set();
      compilation.plugin("before-module-ids", (modules) => {
        modules.forEach((module) => {
          if (module.id === null && module.libIdent) {
            const id = module.libIdent({
              context: this.options.context || compiler.options.context
            });
            let flag = false;
            //rename module name
            let {type,match} = this.options.mapping;
            for (let rule in match) {
              if(type === 'String'){
                if(rule == id){
                  module.id = match[rule];
                  flag = true;
                  break;
                }
              }else if(type === 'regExp'){
                if (new RegExp(rule).test(id)) {
                  module.id = RegExp[match[rule]];
                  flag = true;
                  break;
                }
              }
            }
            if (!flag) {
              const hash = createHash(options.hashFunction);
              hash.update(id);
              const hashId = hash.digest(options.hashDigest);
              let len = options.hashDigestLength;
              while (usedIds.has(hashId.substr(0, len)))
                len++;
              module.id = hashId.substr(0, len);
              usedIds.add(module.id);
            }
          }
        });
      });
    });
  }
}

module.exports = customHashedModuleIdsPlugin;
