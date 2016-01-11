const Table = require("easy-table");

const data = [
  {
    "name": "roloyolo",
    "count": 15
  },
  {
    "name": "danberger",
    "count": 5
  },
  {
    "name": "mr.bigglesworth",
    "count": 2
  }
];

const t = new Table();

data.forEach(function(row) {
  t.cell("Name", row.name);
  t.cell("# of PRs Merged", row.count);
  t.newRow();
});

console.log("Starting Date: ", "2016-01-01");
console.log("Organization: ", "socialtables");
console.log("\n");
console.log(t.toString());