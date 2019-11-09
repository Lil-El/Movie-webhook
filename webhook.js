let http = require("http");
let { spawn } = require("child_process");
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
    req.on("end", function() {
      let body = Buffer.concat(buffers);
      let event = req.headers["x-github-event"];
      let signature = req.headers["x-hub-signature"];
      if (signature !== sign(body)) {
        console.log("Not Allow");
        return res.end("Not Allow");
      }
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: true }));
      if (event == "push") {
        let payload = JSON.parse(body);
        console.log(`PUSH CODE: ${payload.repository.name} - ${new Date()}`);
        let child = spawn("sh", [
          `./${
            payload.repository.name == "Movie" ? "movie-front" : "movie-back"
          }.sh`
        ]);
        let buffers = [];
        child.on("data", buffer => {
          buffers.push(buffer);
        });
        child.on("end", buffer => {
          let log = Buffer.concat(buffers);
          console.log(log);
        });
      }
    });
  } else {
    res.end("Not Found");
  }
});
server.listen(4000, () => {
  console.log("server is running in port 4000");
});
