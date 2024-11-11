const mariadb = require("./database/connect/mariadb");

function main(res) {
  mariadb.query("SELECT * FROM product", (err, row) => {
    console.log(err);
    console.log(row);
  });
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("메인입니다.");
  res.end();
}
function login(res) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("로그인 입니다.");
  res.end();
}

const handle = {};
handle["/"] = main;
handle["/loign"] = login;

module.exports = { handle };
