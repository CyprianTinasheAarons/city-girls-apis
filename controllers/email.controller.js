const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    service: 'gmail.com',
  
    auth: {
        user: process.env.EMAIL_BACKEND,
        pass: process.env.EMAIL_PASSWORD  
    }
});





  
exports.sendInquiry = (req, res) => {

    const mailOptions = {
        from: 'no-reply@freshinabox.co.zw', // sender address
        to: req.body.email,
       
        subject: "Architect Account Details", // Subject line
        text: `Hi 


          \n`,  
    }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(404).json({message: error});
        } else {
          return res.status(200).json({message: `${info.response}`});
        }
      });
   

  };
  