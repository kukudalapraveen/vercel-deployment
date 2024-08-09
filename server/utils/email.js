const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const sendEmail = async (to, subject, text) => {
  const EMAIL="praveendevmail@gmail.com"
const EMAIL_PASSWORD="hoef xvdb aghy mmuh"

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
      }
    })
  );

  const mailOptions = {
    from: EMAIL,
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
