let http = require("http");
let server = http.createServer((req, res) => {
  if (req.method == "POST" && req.url == "/webhook") {
    console.log(req.method + req.url);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ ok: true }));
  } else {
    res.end("Not Found");
  }
});
server.listen(4000, () => {
  console.log("server is running in port 4000");
});
