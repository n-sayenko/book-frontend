const express = require("express");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const routes = require("./routes");

const handler = routes.getRequestHandler(app);
app.prepare().then(() => {
  const server = express();
  server.enable("trust proxy");
  server.set("port", process.env.PORT || 3000);
  server.get("*", handler);
  server.listen(server.get("port"), () => {
    console.log("Node app is running on port", server.get("port"));
  });
});
