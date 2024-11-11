const http = require("http");
const url = require("url");

function start(router, handle) {
  function onRequest(req, res) {
    const pathName = url.parse(req.url).pathname;
    const queryDate = url.parse(req.url, true).query;
    router.route(pathName, handle, res, queryDate.productId);
  }

  http.createServer(onRequest).listen(8888);
}

module.exports = { start };
