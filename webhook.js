let http = require("http");
let crypto = require("crypto");
const SECRET = "123456";
function sign(body) {
  return (
    `sha1=` +
    crypto
      .createHmac("sha1", SECRET)
      .update(body)
      .digest("hex")
  );
}

let server = http.createServer((req, res) => {
  if (req.method == "POST" && req.url == "/webhook") {
    console.log(req.method + req.url);
    let buffers = [];
    req.on("data", function(buffer) {
      buffers.push(buffer);
    });
    req.on("end", function(buffer) {
      let body = Buffer.concat(buffers);
      let event = req.headers["x-gitHub-event"];
      let signature = req.headers["x-hub-signature"];
      if (signature !== sign(body)) {
        console.log("Not Allow");
        return res.end("Not Allow");
      }
    });
    res.setHeader("Content-Type", "application/json");

    res.end(JSON.stringify({ ok: true }));
  } else {
    res.end("Not Found");
  }
});
server.listen(4000, () => {
  console.log("server is running in port 4000");
});
