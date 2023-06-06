const nodemailer = require("nodemailer");

function sendmail(receiver, Subject, content) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lightlime145@gmail.com",
      pass: "dhatpdlmuhhlnuzp",
    },
  });

  var mailOptions = {
    from: "lightlime145@gmail.com",
    to: receiver,
    subject: Subject,
    text: content,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const mailsend = sendmail();

module.exports = { mailsend };
