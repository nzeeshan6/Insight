// Import necessary libraries
import dotenv from "dotenv";
dotenv.config();

import { OpenAI } from "openai";

// Access the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;
console.log("api: ", apiKey);

// Configure the OpenAI client
const openai = new OpenAI({ apiKey });

// Example function to call GPT-4
async function callGPT4(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    console.log(response.data.choices[0].message.content);
  } catch (error) {
    console.error("Error calling GPT-4:", error);
  }
}

// Call the function with a prompt
callGPT4("Hello, GPT-4! How can I set up OpenAI in my Codespace?");
