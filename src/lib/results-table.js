"use strict";

const Table = require("easy-table");

const t = new Table();

module.exports.addRow = function(data) {
  t.cell("Name", data.name);
  t.cell("# of PRs Merged", data.count);
  t.newRow();
};

module.exports.toString = t.toString;