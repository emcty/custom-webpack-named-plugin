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
            if (this.options.mapping) {
              for (let rule in this.options.mapping) {
                if (new RegExp(rule).test(id)) {
                  module.id = RegExp[this.options.mapping[rule]];
                  flag = true;
                  break;
                } else if (rule == id) {
                  module.id = this.options.mapping[rule];
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
