"use strict";
const nodemailer = require("nodemailer");
module.exports =  async (receiver, subject, body) => {
    console.log('receiver',receiver, 'subject',subject , 'body',body)
  try{
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, 
        auth: {
          user: process.env.SMTP_USERNAME, 
          pass: process.env.SMTP_PASSWORD, 
        },
      });
    
      return await transporter.sendMail({
        from: process.env.SMTP_SENDER,
        to: receiver,
        subject, 
        html: body,
      });

  }catch(error){
        return error
  }
  
}