/*
  @description: a webpack plugin to To customize module names
  webpack>4 hashedModuleIds -> hashedPlugin
  webpack>4 namedModules -> namedPlugin
  webpack<4 HashedModuleIdsPlugin -> hashedPlugin
  webpack<4 NamedModulesPlugin -> namedPlugin
*/

"use strict";
const hashedPlugin = require("./lib/customHashedModulesPlugin");
const namedPlugin = require("./lib/customNamedModulesPlugin");

module.exports = {
  hashedPlugin,
  namedPlugin
};
