const nodemailer = require("nodemailer");

function sendmail(receiver, Subject, content) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shameen12319@gmail.com",
      pass: "vgnjawchqoxrkbwc",
    },
  });

  var mailOptions = {
    from: "shameen12319@gmail.com",
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
