const fs = require("fs"); // 파일 읽어보는 모듈
const main_view = fs.readFileSync("./main.html", "utf-8");
const mariadb = require("./database/connect/mariadb");

function main(res) {
  mariadb.query("SELECT * FROM product", (err, row) => {
    console.log(err);
    console.log(row);
  });
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write(main_view);
  res.end();
}

function redRacket(res) {
  fs.readFile("./img/redRacket.png", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(data);
    res.end();
  });
}
function blueRacket(res) {
  fs.readFile("./img/blueRacket.png", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(data);
    res.end();
  });
}
function blackRacket(res) {
  fs.readFile("./img/blackRacket.png", (err, data) => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(data);
    res.end();
  });
}

const handle = {};
handle["/"] = main;

/**
 * image 경로
 */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

module.exports = { handle };
