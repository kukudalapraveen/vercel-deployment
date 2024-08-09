const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    })
  );

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    text
  };

  try {
    // console.log(transporter,"transportertransportertransporter")
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return {
      sendStatusMsg: 'Thanks for contacting us',
      infoResponse: info.response,
      sendStatus: 1
    };
  } catch (err) {
    console.error('Error sending email:', err);
    return {
      sendStatusMsg: 'Sorry! something went wrong!',
      errResponse: err,
      sendStatus: 0
    };
  }
};

module.exports = sendEmail;
