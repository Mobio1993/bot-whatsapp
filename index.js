require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const message = req.body.Body;
  const from = req.body.From;

  let response = "Bonjour !";

  if (message.toLowerCase().includes("bonjour")) {
    response = "Salut 👋, comment puis-je vous aider aujourd'hui ?";
  } else if (message.toLowerCase().includes("commande")) {
    response = "Envoyez-moi le nom du produit à commander 🛒.";
  }

  res.set("Content-Type", "text/xml");
  res.send(`
    <Response>
      <Message>${response}</Message>
    </Response>
  `);
});

app.get("/", (req, res) => {
  res.send("Bot WhatsApp en ligne !");
});

app.listen(port, () => {
  console.log(`Bot en écoute sur le port ${port}`);
});
