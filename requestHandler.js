const fs = require("fs"); // 파일 읽어보는 모듈
const mariadb = require("./database/connect/mariadb");

const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html");

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

function order(res, productId) {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  mariadb.query(
    `INSERT INTO orderlist VALUES (
        ${productId},
        "${new Date().toLocaleDateString()}"
    );`,
    (err, row) => {
      console.log(row);
      console.log(err);
    }
  );
  res.write("order page");
  res.end();
}

function orderlist(res) {
  console.log("orderlist");

  res.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query("SELECT * FROM orderlist", function (err, rows) {
    res.write(orderlist_view);

    rows.forEach((element) => {
      res.write(
        "<tr>" +
          "<td>" +
          element.product_id +
          "</td>" +
          "<td>" +
          element.order_date +
          "</td>" +
          "</tr>"
      );
    });

    res.write("</table>");
    res.end();
  });
}

const handle = {};
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/**
 * image 경로
 */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

module.exports = { handle };
