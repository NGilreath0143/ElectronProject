var bodyParser = require('body-parser');
var express = require('express');
var nodemailer = require('nodemailer');
var app = express();

const PORT = process.env.PORT || 2900;

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '500mb'
}));
app.use(bodyParser.json({
	 extended: true,
  limit: '500mb'
}));

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '{Insert UserName For Outgoing Email Account Here}',
    pass: '{Insert Password For Outgoing Email Account Here}'
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.post('/api/contact/photo', function (req, res) {
  var mailOptions = {
    to: '{Insert Recipient Email Address Here}',
    subject: req.body.subject,
    text: req.body.message,
    attachments: [
    	{
    		filename: 'Photo.png',
    		content: new Buffer.from(req.body.image.split("base64,")[1], "base64")
    	}
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
  res.status(200);
  res.end();
});

var server = app.listen(PORT, function (req, res) {
  console.log('Running Server...');
});