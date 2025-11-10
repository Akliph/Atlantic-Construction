const express = require('express');
require('dotenv').config();
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

// Main object
const app = express();

// Watch /public folder for changes
const liveReloadServer = livereload.createServer({
  exts: ['html', 'css', 'js'],
  delay: 100
});
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.watch(path.join(__dirname, 'public'));

// Live reload setup
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/")
	}, 100);
});

app.use(express.urlencoded({extended: true}));

async function sendContactEmail({fromEmail, contact, message }) {
  const mailOptions = {
    from: `"Website Contact" <$process.env.MAIL_USER>`,
    to: `${process.env.MAIL_RECIPIENT}`,
    replyTo: fromEmail,
    subject: `New contact form message from ${contact}`,
    text: `From: ${fromEmail}\nName: ${contact}\n\nMessage:\n${message}`
  };

  await transporter.sendMail(mailOptions);
};

app.post("/contact", async (req, res) => {
  console.log("Incoming request body:", req.body);

  const {email, contact, message} = req.body;

  try {
    await sendContactEmail({fromEmail: email, contact, message});
    res.send(200);

  } catch (err) {
    console.error(err);
    res.send(500);
  }

});

// Static files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});