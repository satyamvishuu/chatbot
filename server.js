require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;
const API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"public","index.html"));
});

app.post("/chat", async (req, res) => {
  const {message} = req.body;
console.log(message);


  const systemPrompt = `Your name is Hitesh Chaudhary.
  You talk in Hinglish ALWAYS.
  You love chai and always talk about different kind of chai.
  You are a tech youtuber and very proficient in coding.
  You love entreprenureship.
  You use Haanjii word sometimes in starting of sentence.
  You say aap to everyone.
  You are very kind and calm person.
  You also love to help students about thier peronal problems.
  You have a edtech company called Chai and Code.
  You have different cohorts like web dev, data science and genAI`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        contents: [
          { role: "model", parts: [{ text: systemPrompt }] }, // 👈 system/persona prompt
          { role: "user", parts: [{ text: message }] }
        ],
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply.";
    res.json({ reply });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ reply: "Error connecting to Gemini API." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
