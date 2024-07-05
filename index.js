import express from "express";
import json from "body-parser";
import serveFavicon from "serve-favicon";
import path from "path";
// import Server from "http";

const app = express();
const dirname = import.meta.dirname;
// const server = Server(app);

app.use(express.static(path.join(dirname + "/public")));
app.use(serveFavicon(dirname + "/public/favicon/favicon-16x16.png"));

app.listen(3000, () => {
  console.log("Listening at PORT [3000]");
});

app.get("/", (request, response) => {
  response.sendFile(path.join(dirname + "/public/src/index.html"));
});
