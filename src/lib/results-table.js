"use strict";

const Table = require("easy-table");

const FIRST_COLUMN = "Name";
const SECOND_COLUMN = "# of PRs Merged";

const t = new Table();

function addRow(data) {
  t.cell(FIRST_COLUMN, data.name);
  t.cell(SECOND_COLUMN, data.count, Table.number());
  t.newRow();
};

function sortByCount() {
  t.sort([SECOND_COLUMN]);
};

module.exports = Object.assign(t, {
  addRow,
  sortByCount
});