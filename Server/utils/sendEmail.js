const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: EMAIL_AUTH_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: subject,
    html: text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
