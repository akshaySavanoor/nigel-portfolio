const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// POST endpoint for the contact form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transport object with your email service provider details
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nperis27@gmail.com',
      pass: 'jidgpsswauukjdsf',
    },
  });

  // Configure the email options
  const mailOptions = {
    from: 'nperis27@gmail.com',
    to: 'nperis27@gmail.com',
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
