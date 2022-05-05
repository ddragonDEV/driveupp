"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_alias_1 = require("module-alias");
const path_1 = require("path");
(0, module_alias_1.addAliases)({
    '@config': (0, path_1.join)(__dirname, '../src/config'),
    "@bootstrap": (0, path_1.join)(__dirname, "./"),
    "@modules": (0, path_1.join)(__dirname, '../src/modules'),
    "@controllers": (0, path_1.join)(__dirname, '../src/core/infraestructure/controllers'),
    "@events": (0, path_1.join)(__dirname, '../src/core/infraestructure/events'),
    "@application": (0, path_1.join)(__dirname, '../src/core/application'),
    "@domain": (0, path_1.join)(__dirname, '../src/core/domain'),
    "@framework": (0, path_1.join)(__dirname, '../src/core/framework')
});
