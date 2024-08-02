// Importing necessary libraries
import express from "express";
import bodyParser from "body-parser";
import serveFavicon from "serve-favicon";
import path from "path";
import { callGPT4 } from "./gptFlow.js";

// Creating constants and Global Variables
const app = express();
const dirname = import.meta.dirname;
let result = {};
let loadingMessage = "Insights are being generated. Please Wait ...";

// Additional Features to Express App
app.use(express.static(path.join(dirname + "/public")));
app.use(serveFavicon(dirname + "/public/favicon/favicon-16x16.png"));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Listening at PORT [3000]");
});

// Landing Page Route
app.get("/", (request, response) => {
  response.sendFile(path.join(dirname + "/public/src/promptIndex.html"));
});

// First POST Data Route
app.post("/insights", async (request, response) => {
  const patentNumber = request.body.patentNumber;
  const searchLogs = request.body.searchLogs;
  const searchPrompts = request.body.searchPrompts;
  console.log(searchPrompts);
  // console.log("Request: ", request);
  // console.log("Patent Number received: ", patentNumber);
  // console.log("Search Log received: ", searchLogs);
  result = {};
  loadingMessage = "Insight is being generated. Please Wait ...";
  response.setHeader("202", { "content-type": "application/json" });
  // response.send({ message: "All things are received okay" });
  // response.end();
  response.status(202).json({ message: loadingMessage });

  // Simulate a long-running process
  // setTimeout(() => {
  //   result = { message: `Processed insights for patent ${patentNumber}` };
  // }, 1000); // Adjust the delay as needed
  // result = {message: await callGPT4(patentNumber, searchLogs)};
  const processedResponse = await callGPT4(patentNumber, searchLogs, searchPrompts);
  result = { message: processedResponse };
});

// Refresh Route
app.get("/insight-result", (request, response) => {
  // console.log("Request Recevied at Insight Result");
  if (result.message) {
    response.setHeader("200", { "content-type": "application/json" });
    response.status(200).json(result);
  } else {
    loadingMessage += ".";
    response.setHeader("202", { "content-type": "application/json" });
    response.status(202).json({ message: loadingMessage });
  }
});
