// Import necessary libraries
import "dotenv/config";
import { OpenAI } from "openai";
import { systemPrompt1, systemPrompt2 } from "./systemPrompt.js";

// Access the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;

// Access the organization id from the environment variables
const orgID = process.env.OPENAI_ORG_ID;

// Access the requested AI model from the environment variables
const model = process.env.OPENAI_MODEL;

// Check if everything is correctly loaded
if (!apiKey || !orgID || !model) {
  throw new Error(
    'One of the Enviroment Variables is not set.\nPlease create a ".env" file.\nSet these parameters\nOPENAI_API_KEY = APIXX\nOPENAI_ORG_ID = ORGXXX\nOPENAI_MODEL = MODELXXX'
  );
}

// Create a new OpenAI instance
const openai = new OpenAI({
  organization: orgID,
  apiKey: apiKey,
});

// Function to generate insight
export async function callGPT4(patentNumber, searchLogs, searchPrompts) {
  return new Promise(async (resolve, reject) => {
    try {
      // Creating a Chat Sequence
      var msg = [{role:"system", content: systemPrompt1}];

      for (var i=0;i<searchPrompts.length;i++){
        msg.push({role:"system", content: searchPrompts[i]});
      }

      msg.push({ role: "user", content: `Patent Number: ${patentNumber}` });
      msg.push({ role: "user", content: `Search Logs: ${searchLogs}` }); 

      const response = await openai.chat.completions.create({
        model: model,
        messages: msg,
        // messages: [
        //   { role: "system", content: systemPrompt1 },
        //   { role: "system", content: systemPrompt2 },
        //   { role: "user", content: `Patent Number: ${patentNumber}` },
        //   { role: "user", content: `Search Logs: ${searchLogs}` },
        // ],
      });
      resolve(response.choices[0].message.content);
      // console.log(response.choices);
      // console.log(response.choices[0].message.content);
    } catch (error) {
      console.error("[ERROR] Error calling GPT-4:");
      console.error(error);
    }
  });
}
