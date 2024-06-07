const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: '../.env' });
const { MailtrapClient } = require("mailtrap");


const app = express()
app.use(express.json())
app.use(cors())


const TOKEN = "982281476ed85f01624c45b6b9423f48";
const ENDPOINT = "https://send.api.mailtrap.io/";

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};
const recipients = [
  {
    email: "vojtajez53@gmail.com",
  }
];



app.post('/email', (req, res) => {
    const {name, email, message, mobile, option, additional}  = req.body


    client
  .send({
    from: sender,
    to: recipients,
    subject: "Zájemce ze stránky",
    text: `Jméno a přijímení: ${name},\n Email: ${email}, \n Tel. číslo: ${mobile}, \n Klient chce pomoct s: ${option=="option3" ? additional: option}  ${message ? "\n Zpráva: " + message:""}`,
    category: "Integration Test",
  })
  .then(console.log, console.error);
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server běží na portu ${PORT}`)
});