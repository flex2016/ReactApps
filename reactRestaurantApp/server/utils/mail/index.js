const mailer = require("nodemailer");
const { welcome } = require("./welcome_template");
const { purchase } = require("./purchase_template");
const { resetPass } = require("./resetpass_template");
require("dotenv").config();

const getEmailData = (to, name, token, template, actionData) => {
  let data = null;

  switch (template) {
    case "welcome":
      data = {
        from: "Del Frexo <codemasterflexdev@gmail.com>",
        to,
        subject: `Welcome to Del Frexo ${name}`,
        html: welcome(),
      };
      break;
    case "purchase":
      data = {
        from: "Del Frexo <codemasterflexdev@gmail.com>",
        to,
        subject: `Thanks for your purchase ${name}`,
        html: purchase(actionData),
      };
      break;
    case "reset_password":
      data = {
        from: "Waves <codemasterflexdev@gmail.com>",
        to,
        subject: `Hey ${name}, reset your pass`,
        html: resetPass(actionData),
      };
      break;
    default:
      data;
  }
  return data;
};

const sendEmail = (to, name, token, type, transactionData = null) => {
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "codemasterflexdev@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mail = getEmailData(to, name, token, type, transactionData);

  smtpTransport.sendMail(mail, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      cb();
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
