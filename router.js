function route(pathName, handle, res, productId) {
  console.log(pathName);

  if (typeof handle[pathName] === "function") handle[pathName](res, productId);
  else {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("존재하지 않는 페이지입니다.");
    res.end();
  }
}

module.exports = { route };
