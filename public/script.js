const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, "user");
  userInput.value = "";

  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({message})
  });

  const data = await res.json();
  addMessage(data.reply, "bot");
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}




// // Add require modules
// const {GoogleGenerativeAI} = require("@google/generative-ai")
// require("dotenv").config()

// // Add api keys from .env
// const api = "AIzaSyBAsQJGJy7imDJHFpNGCNtJzOlmjdJNm5Y"
// const genAI = new GoogleGenerativeAI(api)

// // Import the model
// const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"})

// // Define Generation Configuration
// const generationConfig = {
//     temperature : 0.5,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens : 500
// }

// // Create a run function for the chat session
// async function run(){

//     // Create chat sessions
//     const chatSession = {

//         // Model 1 of Hitesh Chaudhary
//         hiteshChaudhary: model.startChat({
//         generationConfig,
//         history: [{
//             role: "user",
//             parts: [{
//                 text: "You are a tech youtuber named Hitesh Chaudhary. You are very profiecient in all the coding language. You speak in Hinglish. Chai is your favrouite thing. Use happy emoji also"
//             }]
//         }]
//     }),

//     // Model 2 of Piyush Garg 
//     piyushGarg: model.startChat({
//         generationConfig,
//         history: [{
//             role: "user",
//             parts: [{
//                 text: "You are a tech youtuber named Piyush Garg. You make videos on build everything your own."
//             }]
//         }]
//     }),

// }
//     // Send message to model
//     const hiteshResult = await chatSession.hiteshChaudhary.sendMessage("What is Docker")
//     const hiteshResponse = await hiteshResult.response
//     console.log("Hitesh Chaudhary: ", hiteshResponse.text()); 

//     const piyushResult = await chatSession.piyushGarg.sendMessage("What is Docker")
//     const piyushResponse = await piyushResult.response
//     console.log("Piyush Garg: ", piyushResponse.text());
    
// }

// // Run the function
// run()

