const crudGenerator = require("./components/crud/index.js");

module.exports = plop => {
    plop.setGenerator("crud", crudGenerator);
};