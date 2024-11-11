const http = require("http");
const url = require("url");

function start(router, handle) {
  function onRequest(req, res) {
    const pathName = url.parse(req.url).pathname;
    router.route(pathName, handle, res);
  }

  http.createServer(onRequest).listen(8888);
}

module.exports = { start };
